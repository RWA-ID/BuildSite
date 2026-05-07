import { PinataSDK } from "pinata-web3";

let _pinata: PinataSDK | null = null;

function getPinata() {
  if (!_pinata) {
    _pinata = new PinataSDK({
      pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT!,
      pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY!,
    });
  }
  return _pinata;
}

export async function uploadHTMLToIPFS(
  htmlContent: string,
  ensName: string
): Promise<string> {
  const pinata = getPinata();
  const blob = new Blob([htmlContent], { type: "text/html" });
  const file = new File([blob], "index.html", { type: "text/html" });
  const upload = await pinata.upload.file(file).addMetadata({
    name: `${ensName}-buildsite`,
    keyValues: { ensName, builtWith: "buildsite.eth" },
  });
  return upload.IpfsHash;
}

export async function uploadImageToIPFS(file: File): Promise<string> {
  const pinata = getPinata();
  const upload = await pinata.upload.file(file).addMetadata({
    name: file.name,
    keyValues: { type: "buildsite-image" },
  });
  return `${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${upload.IpfsHash}`;
}
