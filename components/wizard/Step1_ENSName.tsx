"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { formatEther } from "viem";
import { useBuilderStore } from "@/lib/store";
import { checkENSAvailability, getENSRentPrice, ETH_REGISTRAR_CONTROLLER, registrarControllerAbi, publicClient, normalize } from "@/lib/ens";
import { ConnectButton } from "@/components/ui/ConnectButton";

const ENS_PUBLIC_RESOLVER = "0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63" as `0x${string}`;
const REGISTER_DURATION = BigInt(365 * 24 * 60 * 60);

export function Step1_ENSName({ onNext }: { onNext: () => void }) {
  const { ensName, ensMode, setEnsName, setEnsMode } = useBuilderStore();
  const { address, isConnected } = useAccount();

  const [label, setLabel] = useState("");
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [price, setPrice] = useState<{ base: bigint; premium: bigint } | null>(null);
  const [commitSubmitted, setCommitSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [secret, setSecret] = useState<`0x${string}` | null>(null);
  const [registerReady, setRegisterReady] = useState(false);

  const [existingName, setExistingName] = useState(ensName.replace(".eth", ""));
  const [ownerVerified, setOwnerVerified] = useState<boolean | null>(null);
  const [verifying, setVerifying] = useState(false);

  const { writeContract, data: commitTxHash, isPending: commitPending } = useWriteContract();
  const { isSuccess: commitConfirmed } = useWaitForTransactionReceipt({ hash: commitTxHash });
  const { writeContract: doRegister, data: registerTxHash, isPending: registerPending } = useWriteContract();
  const { isSuccess: registerConfirmed } = useWaitForTransactionReceipt({ hash: registerTxHash });

  useEffect(() => {
    if (!label || label.length < 3) { setAvailable(null); setPrice(null); return; }
    const t = setTimeout(async () => {
      setChecking(true);
      try {
        const [avail, rentPrice] = await Promise.all([
          checkENSAvailability(label),
          getENSRentPrice(label),
        ]);
        setAvailable(avail);
        setPrice(rentPrice);
      } catch { setAvailable(null); }
      setChecking(false);
    }, 600);
    return () => clearTimeout(t);
  }, [label]);

  useEffect(() => {
    if (commitConfirmed && !commitSubmitted) setCommitSubmitted(true);
  }, [commitConfirmed, commitSubmitted]);

  useEffect(() => {
    if (!commitSubmitted) return;
    setCountdown(62);
    const stored = localStorage.getItem(`buildsite_commit_${label}`);
    if (stored) {
      const { startTime } = JSON.parse(stored);
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, 62 - elapsed);
      setCountdown(remaining);
      if (remaining === 0) setRegisterReady(true);
    }
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(interval); setRegisterReady(true); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [commitSubmitted, label]);

  useEffect(() => {
    if (registerConfirmed) {
      setEnsName(`${label}.eth`);
      onNext();
    }
  }, [registerConfirmed, label, setEnsName, onNext]);

  async function handleCommit() {
    if (!address || !label || !available || !price) return;
    const newSecret = `0x${Array.from(crypto.getRandomValues(new Uint8Array(32))).map(b => b.toString(16).padStart(2, "0")).join("")}` as `0x${string}`;
    setSecret(newSecret);

    const commitment = await publicClient.readContract({
      address: ETH_REGISTRAR_CONTROLLER,
      abi: registrarControllerAbi,
      functionName: "makeCommitment",
      args: [label, address, REGISTER_DURATION, newSecret, ENS_PUBLIC_RESOLVER, [], false, 0],
    });
    localStorage.setItem(`buildsite_commit_${label}`, JSON.stringify({ secret: newSecret, commitment, startTime: Date.now() }));
    writeContract({
      address: ETH_REGISTRAR_CONTROLLER,
      abi: registrarControllerAbi,
      functionName: "commit",
      args: [commitment],
    });
  }

  async function handleRegister() {
    if (!address || !label || !secret || !price) return;
    const totalPrice = price.base + price.premium;
    doRegister({
      address: ETH_REGISTRAR_CONTROLLER,
      abi: registrarControllerAbi,
      functionName: "register",
      args: [label, address, REGISTER_DURATION, secret, ENS_PUBLIC_RESOLVER, [], false, 0],
      value: totalPrice + (totalPrice / BigInt(100)),
    });
  }

  async function handleVerifyExisting() {
    if (!existingName || !address) return;
    setVerifying(true);
    setOwnerVerified(null);
    try {
      const fullName = existingName.endsWith(".eth") ? existingName : `${existingName}.eth`;
      const owner = await publicClient.getEnsAddress({ name: normalize(fullName) });
      const matched = owner?.toLowerCase() === address.toLowerCase();
      setOwnerVerified(matched);
      if (matched) setEnsName(fullName);
    } catch { setOwnerVerified(false); }
    setVerifying(false);
  }

  function handleExistingContinue() {
    const fullName = existingName.endsWith(".eth") ? existingName : `${existingName}.eth`;
    setEnsName(fullName);
    onNext();
  }

  const totalPriceEth = price ? parseFloat(formatEther(price.base + price.premium)).toFixed(5) : null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-10">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-blue-400 mb-3">— STEP 01</div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
          Choose your <span className="text-gradient-blue">.eth</span> name.
        </h2>
        <p className="text-white/50 text-lg">Use one you already own, or register a new one — both work onchain.</p>
      </div>

      {!isConnected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-5 glass rounded-2xl"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 grid place-items-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M12 8v4 m0 4h.01" /></svg>
            </div>
            <div className="flex-1">
              <p className="font-medium text-white mb-1">Connect your wallet first</p>
              <p className="text-sm text-white/50 mb-4">We need to verify ownership of any existing ENS name.</p>
              <ConnectButton />
            </div>
          </div>
        </motion.div>
      )}

      {/* Mode selector */}
      <div className="grid grid-cols-2 gap-2 p-1 glass rounded-2xl mb-8">
        {(["existing", "register"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setEnsMode(mode)}
            className={`relative py-3 px-4 rounded-xl text-sm font-medium transition-all ${
              ensMode === mode
                ? "bg-white text-black shadow-lg"
                : "text-white/60 hover:text-white"
            }`}
          >
            {mode === "existing" ? "I own a name" : "Register new"}
          </button>
        ))}
      </div>

      {ensMode === "existing" ? (
        <motion.div
          key="existing"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="glass rounded-2xl p-5">
            <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">
              Your ENS name
            </label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={existingName}
                  onChange={(e) => { setExistingName(e.target.value.toLowerCase().replace(/\.eth$/, "")); setOwnerVerified(null); }}
                  placeholder="vitalik"
                  className="w-full bg-transparent text-2xl font-display font-bold text-white placeholder-white/20 focus:outline-none"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/30 text-2xl font-display font-bold pointer-events-none">.eth</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleVerifyExisting}
            disabled={!existingName || !isConnected || verifying}
            className="w-full py-3 rounded-xl glass text-white/80 hover:text-white hover:border-white/20 font-medium text-sm disabled:opacity-30 transition-all"
          >
            {verifying ? "Verifying ownership..." : "Verify ownership"}
          </button>

          {ownerVerified === true && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              <span className="text-emerald-400 text-sm font-medium">Verified — you own {existingName}.eth</span>
            </motion.div>
          )}
          {ownerVerified === false && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              <span className="text-red-400 text-sm font-medium">This wallet doesn't own {existingName}.eth</span>
            </motion.div>
          )}

          <button
            onClick={handleExistingContinue}
            disabled={!existingName || !isConnected}
            className="w-full py-4 rounded-xl bg-white text-black font-semibold disabled:opacity-30 hover:scale-[1.01] transition-transform glow-blue"
          >
            Continue with {existingName || "your name"}.eth →
          </button>
        </motion.div>
      ) : (
        <motion.div
          key="register"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="glass rounded-2xl p-5">
            <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">
              New ENS name
            </label>
            <div className="flex-1 relative">
              <input
                type="text"
                value={label}
                onChange={(e) => { setLabel(e.target.value.toLowerCase().replace(/\s/g, "")); setAvailable(null); setCommitSubmitted(false); setRegisterReady(false); }}
                placeholder="yourname"
                className="w-full bg-transparent text-2xl font-display font-bold text-white placeholder-white/20 focus:outline-none"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/30 text-2xl font-display font-bold pointer-events-none">.eth</span>
            </div>
            {checking && <p className="text-white/40 text-xs mt-2 font-mono">Checking availability...</p>}
          </div>

          {available === true && price && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span className="text-emerald-400 font-semibold">{label}.eth is available</span>
              </div>
              <p className="text-white/60 text-sm">
                ENS registration: <span className="font-mono text-white">{totalPriceEth} ETH</span> for 1 year + gas
              </p>
            </motion.div>
          )}
          {available === false && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-red-400 text-sm font-medium">❌ {label}.eth is taken — try another name</p>
            </div>
          )}

          {!commitSubmitted && available && (
            <button
              onClick={handleCommit}
              disabled={!isConnected || commitPending || !label}
              className="w-full py-4 rounded-xl bg-white text-black font-semibold disabled:opacity-30 hover:scale-[1.01] transition-transform glow-blue"
            >
              {commitPending ? "Submitting commit..." : "Step 1: Commit (anti front-run)"}
            </button>
          )}

          {commitSubmitted && !registerReady && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-6 text-center">
              <p className="text-white/60 text-sm mb-3">Waiting for commit to settle on chain</p>
              <div className="font-display text-6xl font-black text-gradient-blue">{countdown}<span className="text-2xl text-white/40">s</span></div>
              <p className="text-white/40 text-xs mt-3">ENS requires a 60-second wait to prevent front-running</p>
            </motion.div>
          )}

          {registerReady && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleRegister}
              disabled={!isConnected || registerPending}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold disabled:opacity-30 hover:scale-[1.01] transition-transform"
            >
              {registerPending ? "Registering on-chain..." : `Register ${label}.eth →`}
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  );
}
