"use client";
import { ProfileData } from "@/lib/store";

const SVG = {
  arrow: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>`,
  arrowRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,
  gamepad: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="11" x2="10" y2="11"/><line x1="8" y1="9" x2="8" y2="13"/><line x1="15" y1="12" x2="15.01" y2="12"/><line x1="18" y1="10" x2="18.01" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  twitch: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/></svg>`,
  twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  discord: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_FULL: Record<string, string> = {
  mon: "Mon", monday: "Mon",
  tue: "Tue", tues: "Tue", tuesday: "Tue",
  wed: "Wed", weds: "Wed", wednesday: "Wed",
  thu: "Thu", thur: "Thu", thurs: "Thu", thursday: "Thu",
  fri: "Fri", friday: "Fri",
  sat: "Sat", saturday: "Sat",
  sun: "Sun", sunday: "Sun",
};

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function twitterUrl(handle: string | undefined): string {
  if (!handle) return "";
  if (handle.startsWith("http")) return handle;
  const h = handle.replace(/^@/, "").trim();
  return h ? `https://x.com/${h}` : "";
}

function youtubeUrl(handle: string | undefined): string {
  if (!handle) return "";
  if (handle.startsWith("http")) return handle;
  const h = handle.replace(/^@/, "").trim();
  return h ? `https://youtube.com/@${h}` : "";
}

function discordUrl(handle: string | undefined): string {
  if (!handle) return "";
  if (handle.startsWith("http")) return handle;
  return `https://discord.com/users/${handle}`;
}

function parseSchedule(raw: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!raw) return out;
  const lines = raw.split(/[\n,;]+/).map((l) => l.trim()).filter(Boolean);
  for (const line of lines) {
    const m = line.match(/^([A-Za-z]+)\s+(.+)$/);
    if (m) {
      const key = m[1].toLowerCase();
      const day = DAY_FULL[key];
      if (day && !out[day]) out[day] = m[2].trim();
    }
  }
  return out;
}

interface Props {
  profileData: Partial<ProfileData>;
  ensName: string;
  uploadedImages: Record<string, string>;
}

export function generateStreamerHTML(
  profileData: Partial<ProfileData>,
  ensName: string,
  uploadedImages: Record<string, string>
): string {
  const name = escapeHtml(profileData.displayName || ensName);
  const bio = escapeHtml(
    profileData.bio || "Live on Twitch — chill streams, ranked grinds, and good vibes with the community."
  );
  const twitch = (profileData.twitchChannel || "").replace(/^@/, "").trim();
  const twitchHref = twitch ? `https://twitch.tv/${twitch}` : "";
  const isLive = !!profileData.isLive;
  const scheduleRaw = profileData.streamSchedule || "";
  const schedule = parseSchedule(scheduleRaw);
  const games: string[] = profileData.games || [];
  const donateUrl = profileData.donationUrl || "";
  const profileImg = uploadedImages["profileImage"] || "";

  const tw = twitterUrl(profileData.twitter);
  const yt = youtubeUrl(profileData.youtube);
  const dc = discordUrl(profileData.discord);
  const email = profileData.email || "";

  const currentGame = games[0] || "Just chatting";
  const scheduleSummary = scheduleRaw
    ? scheduleRaw.split(/[\n,;]+/)[0].trim()
    : "Weekly · check schedule";

  const heroH1 = profileData.tagline
    ? escapeHtml(profileData.tagline)
    : `Streaming the <span class="ital">grind</span><br>and the <span class="name">moments</span><br>in between.`;

  const connectTiles: Array<{ icon: string; label: string; handle: string; url: string }> = [];
  if (twitchHref)
    connectTiles.push({ icon: SVG.twitch, label: "Twitch", handle: twitch, url: twitchHref });
  if (tw)
    connectTiles.push({
      icon: SVG.twitter,
      label: "X / Twitter",
      handle: profileData.twitter || "",
      url: tw,
    });
  if (yt)
    connectTiles.push({
      icon: SVG.youtube,
      label: "YouTube",
      handle: profileData.youtube || "",
      url: yt,
    });
  if (dc)
    connectTiles.push({
      icon: SVG.discord,
      label: "Discord",
      handle: profileData.discord || "",
      url: dc,
    });

  const connectStripHTML =
    connectTiles.length > 0
      ? `
<section id="connect" style="padding:64px 0;">
  <div class="container">
    <div class="section-head" style="margin-bottom:24px;">
      <div>
        <div class="section-label">// Connect</div>
        <h2 class="section-title" style="font-size:1.4rem;">Find me <span class="ital">across the platforms</span></h2>
      </div>
    </div>
    <div class="connect-strip" style="grid-template-columns:repeat(${Math.max(
      1,
      Math.min(connectTiles.length, 4)
    )},1fr);">
      ${connectTiles
        .map(
          (t) => `
      <a href="${escapeHtml(t.url)}" class="connect-tile" target="_blank" rel="noopener">
        <div class="connect-icon">${t.icon}</div>
        <div class="connect-info">
          <div class="label">${escapeHtml(t.label)}</div>
          <div class="handle">${escapeHtml(t.handle)}</div>
        </div>
      </a>`
        )
        .join("")}
    </div>
  </div>
</section>`
      : "";

  const playerHTML = `
<section id="watch">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 01 — Live channel</div>
        <h2 class="section-title">${
          isLive
            ? `Live right now —<br><span class="ital">come hang out.</span>`
            : `Tune in next stream,<br><span class="ital">replay until then.</span>`
        }</h2>
      </div>
      <p class="section-sub">${
        twitch
          ? `Player below pulls live from twitch.tv/${escapeHtml(twitch)}.`
          : "Add your Twitch channel to embed the live player here."
      }</p>
    </div>
    <div class="player-card reveal">
      ${
        twitch
          ? `<iframe class="player-frame" src="https://player.twitch.tv/?channel=${encodeURIComponent(
              twitch
            )}&parent=${encodeURIComponent(
              `${ensName}.eth.limo`
            )}&parent=${encodeURIComponent(
              `${ensName}.limo`
            )}&parent=localhost&muted=true&autoplay=false" allowfullscreen scrolling="no" frameborder="0"></iframe>`
          : `<div class="player-placeholder"><div class="player-pl-icon">${SVG.play}</div><div>Twitch player goes here</div></div>`
      }
      <div class="player-overlay">
        <div class="player-meta">
          <span class="${isLive ? "tag tag-live" : "tag"}">${
            isLive ? "● LIVE" : "Offline"
          }</span>
          <span class="player-channel">${escapeHtml(twitch || ensName)}</span>
        </div>
        <div class="player-now">
          <span class="player-now-label">Now playing</span>
          <span class="player-now-game">${escapeHtml(currentGame)}</span>
        </div>
      </div>
    </div>
  </div>
</section>`;

  const scheduleHTML = `
<section id="schedule">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 02 — Weekly schedule</div>
        <h2 class="section-title">Set your alarms.<br><span class="ital">Same time, every week.</span></h2>
      </div>
      <p class="section-sub">${
        scheduleRaw
          ? "Times shown in my local timezone — adjust accordingly."
          : "Schedule will appear here once you add it."
      }</p>
    </div>
    <div class="schedule-grid reveal">
      ${DAYS.map((d) => {
        const time = schedule[d];
        const isOff = !time;
        return `
      <div class="day-card${isOff ? " day-off" : ""}">
        <div class="day-head">
          <span class="day-name">${d}</span>
          ${time ? `<span class="day-dot"></span>` : ""}
        </div>
        <div class="day-time">${time ? escapeHtml(time) : "—"}</div>
        <div class="day-status">${time ? "Live" : "Off"}</div>
      </div>`;
      }).join("")}
    </div>
    ${
      scheduleRaw && Object.keys(schedule).length === 0
        ? `<p class="schedule-fallback reveal">${escapeHtml(scheduleRaw)}</p>`
        : ""
    }
  </div>
</section>`;

  const gamesHTML =
    games.length > 0
      ? `
<section id="games">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 03 — On rotation</div>
        <h2 class="section-title">What I'm <span class="ital">playing</span> right now.</h2>
      </div>
      <p class="section-sub">${games.length} game${
          games.length !== 1 ? "s" : ""
        } in the current rotation — drop a request in chat.</p>
    </div>
    <div class="games-grid">
      ${games
        .map(
          (g, i) => `
      <article class="game-card reveal">
        <div class="game-num">${String(i + 1).padStart(2, "0")}</div>
        <div class="game-icon">${SVG.gamepad}</div>
        <div class="game-body">
          <div class="game-title">${escapeHtml(g)}</div>
          <div class="game-meta">${
            i === 0 ? "Main · grinding ranked" : "On rotation"
          }</div>
        </div>
      </article>`
        )
        .join("")}
    </div>
  </div>
</section>`
      : "";

  const supportHTML = `
<section id="support">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 04 — Support &amp; Connect</div>
        <h2 class="section-title">Help fuel the<br><span class="ital">next stream.</span></h2>
      </div>
      <p class="section-sub">Subs, tips, and just hanging out in chat keep the lights on.</p>
    </div>
    <div class="partner-grid">
      <div class="reveal">
        <p style="font-size:1.05rem;color:var(--ink-2);max-width:480px;text-wrap:pretty;">Every sub and tip goes straight back into the stream — better gear, longer hours, more giveaways. Even just lurking helps the algorithm.</p>
        <div class="partner-pillars">
          <div class="pillar">
            <div class="pillar-num">01</div>
            <div class="pillar-body"><h4>Subscribe on Twitch</h4></div>
          </div>
          <div class="pillar">
            <div class="pillar-num">02</div>
            <div class="pillar-body"><h4>Drop a tip</h4></div>
          </div>
          <div class="pillar">
            <div class="pillar-num">03</div>
            <div class="pillar-body"><h4>Hang in Discord</h4></div>
          </div>
          <div class="pillar">
            <div class="pillar-num">04</div>
            <div class="pillar-body"><h4>Share the stream</h4></div>
          </div>
        </div>
      </div>
      <div class="contact-card reveal">
        <div style="margin-bottom:22px;">
          <div class="section-label" style="margin-bottom:6px;">// Channels</div>
          <div style="font-size:1.25rem;font-weight:600;letter-spacing:-.01em;">Plug in.</div>
          <p style="color:var(--ink-3);font-size:.92rem;margin-top:4px;">Pick the link that fits — they all reach me.</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${
            twitchHref
              ? `<a href="${escapeHtml(
                  twitchHref
                )}" class="plink primary" target="_blank">${SVG.twitch} Watch on Twitch ${SVG.arrow}</a>`
              : ""
          }
          ${
            donateUrl
              ? `<a href="${escapeHtml(
                  donateUrl
                )}" class="plink primary" target="_blank">${SVG.heart} Tip the stream ${SVG.arrow}</a>`
              : ""
          }
          ${
            dc
              ? `<a href="${escapeHtml(
                  dc
                )}" class="plink" target="_blank">${SVG.discord} Discord</a>`
              : ""
          }
          ${
            tw
              ? `<a href="${escapeHtml(
                  tw
                )}" class="plink" target="_blank">${SVG.twitter} ${escapeHtml(
                  profileData.twitter || ""
                )}</a>`
              : ""
          }
          ${
            email
              ? `<a href="mailto:${escapeHtml(
                  email
                )}" class="plink">${SVG.mail} ${escapeHtml(email)}</a>`
              : ""
          }
        </div>
      </div>
    </div>
  </div>
</section>`;

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.displayName || ensName,
    alternateName: ensName,
    jobTitle: "Streamer",
    description: profileData.bio || "Live streamer on Twitch.",
    url: `https://${ensName}.limo`,
    sameAs: [twitchHref, tw, yt, dc].filter(Boolean),
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} — Live on Twitch</title>
<meta name="description" content="${escapeHtml(
    profileData.bio || `Watch ${name} live on Twitch.`
  )}">
<meta property="og:title" content="${name}">
<meta property="og:description" content="${escapeHtml(
    profileData.bio || `Watch ${name} live on Twitch.`
  )}">
<meta property="og:type" content="profile">
<meta property="og:url" content="https://${ensName}.limo">
${profileImg ? `<meta property="og:image" content="${escapeHtml(profileImg)}">` : ""}
<script type="application/ld+json">${jsonLd}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0e0b1a;--bg-1:#131020;--bg-2:#181225;--bg-3:#221837;--line:#241b3a;--line-2:#352851;--ink:#f4f1ff;--ink-2:#bcb3d6;--ink-3:#7d7596;--ink-4:#544c6b;--purple:#9147ff;--purple-2:#c084fc;--pink:#f472b6;--red:#ef4444;--grad:linear-gradient(135deg,#9147ff 0%,#c084fc 100%);--grad-soft:linear-gradient(135deg,rgba(145,71,255,.16) 0%,rgba(244,114,182,.12) 100%)}
html{scroll-behavior:smooth}
body{font-family:'Space Grotesk',-apple-system,BlinkMacSystemFont,sans-serif;background:var(--bg);color:var(--ink);line-height:1.55;-webkit-font-smoothing:antialiased;font-feature-settings:'ss01','ss02';overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background-image:radial-gradient(ellipse 800px 600px at 15% -5%,rgba(145,71,255,.22),transparent 60%),radial-gradient(ellipse 700px 500px at 85% 25%,rgba(192,132,252,.15),transparent 60%),radial-gradient(ellipse 900px 700px at 50% 110%,rgba(244,114,182,.10),transparent 60%);pointer-events:none;z-index:0}
body::after{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(192,132,252,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(192,132,252,.025) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0;mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%)}
main,header,footer,nav{position:relative;z-index:1}
.container{max-width:1240px;margin:0 auto;padding:0 32px}
.nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(20px) saturate(140%);-webkit-backdrop-filter:blur(20px) saturate(140%);background:rgba(14,11,26,.72);border-bottom:1px solid var(--line)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:14px 32px;max-width:1240px;margin:0 auto;gap:16px}
.nav-brand{display:flex;align-items:center;gap:12px;font-family:'JetBrains Mono',monospace;font-size:.92rem;font-weight:500;letter-spacing:-.01em}
.nav-brand .dot{width:8px;height:8px;border-radius:50%;background:var(--purple-2);box-shadow:0 0 12px var(--purple);animation:pulse 2.4s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.55;transform:scale(.85)}}
@keyframes liveBlink{0%,100%{opacity:1}50%{opacity:.45}}
.nav-links{display:flex;gap:4px;align-items:center}
.nav-links a{color:var(--ink-2);text-decoration:none;font-size:.9rem;font-weight:500;padding:8px 14px;border-radius:8px;transition:color .2s ease,background .2s ease}
.nav-links a:hover{color:var(--ink);background:var(--bg-2)}
.nav-cta{display:inline-flex;align-items:center;gap:8px;background:var(--grad)!important;color:#fff!important;font-weight:600!important;border-radius:10px!important;padding:9px 16px!important;box-shadow:0 8px 24px rgba(145,71,255,.35)}
.nav-cta.live{background:var(--red)!important;animation:liveBlink 1.6s ease-in-out infinite}
.nav-cta svg{width:14px;height:14px}
@media(max-width:720px){.nav-links a:not(.nav-cta){display:none}}
.hero{padding:96px 0 80px;position:relative;border-bottom:1px solid var(--line);overflow:hidden}
.hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1fr auto;gap:60px;align-items:center}
.hero-eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:.78rem;font-weight:500;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-2);padding:8px 14px;border:1px solid var(--line-2);border-radius:100px;background:rgba(145,71,255,.06);margin-bottom:28px}
.hero-eyebrow .live{width:6px;height:6px;border-radius:50%;background:${
    isLive ? "var(--red)" : "var(--purple-2)"
  };box-shadow:0 0 8px ${isLive ? "var(--red)" : "var(--purple-2)"};${
    isLive ? "animation:liveBlink 1.4s ease-in-out infinite;" : ""
  }}
.hero h1{font-size:clamp(2.4rem,5.5vw,4.4rem);font-weight:600;letter-spacing:-.035em;line-height:1.02;margin-bottom:24px}
.hero h1 .name{font-family:'JetBrains Mono',monospace;font-weight:500;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;letter-spacing:-.04em}
.hero h1 .ital,.section-title .ital{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;letter-spacing:-.02em}
.section-title .ital{color:var(--purple-2)}
.hero-bio{font-size:1.18rem;color:var(--ink-2);line-height:1.6;max-width:620px;margin-bottom:36px;text-wrap:pretty}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:44px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:13px 22px;border-radius:10px;font-weight:600;font-size:.95rem;text-decoration:none;border:1px solid transparent;transition:all .2s ease;cursor:pointer;font-family:inherit}
.btn-primary{background:var(--grad);color:#fff;box-shadow:0 10px 30px rgba(145,71,255,.4)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 14px 36px rgba(145,71,255,.55)}
.btn-ghost{background:rgba(255,255,255,.03);color:var(--ink);border-color:var(--line-2)}
.btn-ghost:hover{background:rgba(244,114,182,.08);border-color:var(--pink);color:var(--ink);transform:translateY(-2px)}
.btn svg{width:14px;height:14px}
.hero-stats{display:flex;gap:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:8px}
.stat{flex:1;padding:18px 0;border-right:1px solid var(--line)}
.stat:last-child{border-right:none}
.stat-num{font-family:'JetBrains Mono',monospace;font-size:1.4rem;font-weight:600;color:var(--ink);letter-spacing:-.02em;line-height:1.1}
.stat-label{font-size:.72rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.1em;margin-top:6px}
.profile-frame{position:relative;width:280px;flex-shrink:0}
.profile-card{position:relative;width:100%;aspect-ratio:1;border-radius:20px;overflow:hidden;border:1px solid var(--line-2);background:var(--bg-2)}
.profile-card img{width:100%;height:100%;object-fit:cover;filter:contrast(1.05) saturate(1.1)}
.profile-card::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(14,11,26,.88) 100%);pointer-events:none}
.profile-tag{position:absolute;bottom:14px;left:14px;right:14px;display:flex;align-items:center;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:.78rem;color:var(--ink);z-index:2}
.profile-tag .role{color:var(--purple-2)}
.profile-glow{position:absolute;inset:-3px;border-radius:22px;background:var(--grad);z-index:-1;opacity:.55;filter:blur(22px)}
.profile-meta{margin-top:16px;display:flex;flex-direction:column;gap:8px;font-family:'JetBrains Mono',monospace;font-size:.78rem}
.profile-meta-row{display:flex;justify-content:space-between;color:var(--ink-3)}
.profile-meta-row b{color:var(--ink);font-weight:500}
@media(max-width:880px){.hero-inner{grid-template-columns:1fr;gap:36px}.profile-frame{width:200px}}
section{padding:96px 0;border-bottom:1px solid var(--line)}
section:last-of-type{border-bottom:none}
.section-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:48px;gap:24px;flex-wrap:wrap}
.section-label{font-family:'JetBrains Mono',monospace;font-size:.78rem;text-transform:uppercase;letter-spacing:.15em;color:var(--purple-2)}
.section-title{font-size:clamp(1.8rem,3.2vw,2.6rem);font-weight:600;letter-spacing:-.02em;line-height:1.1;margin-top:8px;text-wrap:balance}
.section-sub{color:var(--ink-2);font-size:1.02rem;max-width:460px;text-wrap:pretty}
.connect-strip{display:grid;gap:0;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:var(--bg-1)}
.connect-tile{display:flex;align-items:center;gap:14px;padding:22px 24px;border-right:1px solid var(--line);text-decoration:none;color:var(--ink);transition:background .2s ease}
.connect-tile:last-child{border-right:none}
.connect-tile:hover{background:var(--bg-2)}
.connect-icon{width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:var(--bg-3);color:var(--purple-2);flex-shrink:0}
.connect-icon svg{width:18px;height:18px}
.connect-info{flex:1;min-width:0}
.connect-info .label{font-size:.72rem;color:var(--ink-3);font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.08em}
.connect-info .handle{font-size:.98rem;font-weight:500;color:var(--ink);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
@media(max-width:880px){.connect-strip{grid-template-columns:repeat(2,1fr)!important}}
@media(max-width:480px){.connect-strip{grid-template-columns:1fr!important}.connect-tile{border-right:none;border-bottom:1px solid var(--line)}}
.player-card{position:relative;border-radius:20px;overflow:hidden;border:1px solid var(--line-2);background:#000;box-shadow:0 30px 80px rgba(145,71,255,.18)}
.player-card::before{content:'';position:absolute;inset:-2px;border-radius:22px;background:var(--grad);z-index:-1;opacity:.5;filter:blur(20px)}
.player-frame{display:block;width:100%;aspect-ratio:16/9;border:0}
.player-placeholder{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;aspect-ratio:16/9;background:linear-gradient(135deg,#1a1130 0%,#2a1d4a 100%);color:var(--ink-2);gap:16px;font-family:'JetBrains Mono',monospace;font-size:.92rem}
.player-pl-icon{width:64px;height:64px;border-radius:50%;background:rgba(145,71,255,.18);display:flex;align-items:center;justify-content:center;color:var(--purple-2)}
.player-pl-icon svg{width:28px;height:28px}
.player-overlay{display:flex;justify-content:space-between;align-items:center;padding:16px 22px;background:linear-gradient(180deg,var(--bg-1),var(--bg-2));border-top:1px solid var(--line);gap:16px;flex-wrap:wrap}
.player-meta{display:flex;align-items:center;gap:12px;font-family:'JetBrains Mono',monospace}
.player-channel{font-size:.92rem;color:var(--ink)}
.tag{font-family:'JetBrains Mono',monospace;font-size:.7rem;text-transform:uppercase;letter-spacing:.12em;padding:4px 10px;border-radius:100px;background:var(--bg-3);color:var(--ink-3);border:1px solid var(--line-2);white-space:nowrap}
.tag.tag-live{color:#fff;background:var(--red);border-color:var(--red);animation:liveBlink 1.6s ease-in-out infinite}
.player-now{display:flex;flex-direction:column;align-items:flex-end;gap:2px}
.player-now-label{font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.1em}
.player-now-game{font-size:.95rem;color:var(--ink);font-weight:500}
.schedule-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:12px}
.day-card{background:var(--bg-1);border:1px solid var(--line);border-radius:14px;padding:18px 14px;display:flex;flex-direction:column;gap:8px;transition:all .25s ease;position:relative;overflow:hidden}
.day-card::before{content:'';position:absolute;inset:0;background:var(--grad-soft);opacity:0;transition:opacity .25s ease;pointer-events:none}
.day-card:not(.day-off):hover{border-color:var(--line-2);transform:translateY(-3px)}
.day-card:not(.day-off):hover::before{opacity:1}
.day-card>*{position:relative;z-index:1}
.day-off{opacity:.45}
.day-head{display:flex;justify-content:space-between;align-items:center}
.day-name{font-family:'JetBrains Mono',monospace;font-size:.78rem;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3)}
.day-dot{width:7px;height:7px;border-radius:50%;background:var(--purple-2);box-shadow:0 0 8px var(--purple-2)}
.day-time{font-size:1.05rem;font-weight:600;color:var(--ink);letter-spacing:-.01em}
.day-status{font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.1em}
.day-card:not(.day-off) .day-status{color:var(--purple-2)}
.schedule-fallback{margin-top:24px;padding:18px 22px;background:var(--bg-1);border:1px dashed var(--line-2);border-radius:12px;color:var(--ink-2);font-family:'JetBrains Mono',monospace;font-size:.92rem;text-wrap:pretty}
@media(max-width:1024px){.schedule-grid{grid-template-columns:repeat(4,1fr)}}
@media(max-width:560px){.schedule-grid{grid-template-columns:repeat(2,1fr)}}
.games-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
@media(max-width:880px){.games-grid{grid-template-columns:1fr}}
.game-card{display:flex;align-items:center;gap:18px;padding:22px 24px;background:var(--bg-1);border:1px solid var(--line);border-radius:14px;transition:all .25s ease;position:relative;overflow:hidden}
.game-card::before{content:'';position:absolute;inset:0;background:var(--grad-soft);opacity:0;transition:opacity .25s ease;pointer-events:none}
.game-card:hover{border-color:var(--line-2);transform:translateX(4px)}
.game-card:hover::before{opacity:1}
.game-card>*{position:relative;z-index:1}
.game-num{font-family:'JetBrains Mono',monospace;font-size:.82rem;color:var(--ink-3);font-weight:500;min-width:32px}
.game-icon{width:42px;height:42px;border-radius:10px;background:var(--bg-3);color:var(--purple-2);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.game-icon svg{width:20px;height:20px}
.game-body{flex:1;min-width:0}
.game-title{font-size:1.08rem;font-weight:600;letter-spacing:-.01em;margin-bottom:2px}
.game-meta{font-family:'JetBrains Mono',monospace;font-size:.74rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.08em}
.partner-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:56px;align-items:start}
@media(max-width:880px){.partner-grid{grid-template-columns:1fr;gap:40px}}
.partner-pillars{display:grid;gap:14px;margin-top:28px}
.pillar{display:flex;gap:16px;padding:18px 20px;border:1px solid var(--line);border-radius:12px;background:var(--bg-1);transition:all .2s ease}
.pillar:hover{border-color:var(--line-2);transform:translateX(4px)}
.pillar-num{font-family:'JetBrains Mono',monospace;font-size:.82rem;color:var(--purple-2);font-weight:500;min-width:32px;padding-top:1px}
.pillar-body h4{font-size:1.02rem;font-weight:600;margin-bottom:4px;letter-spacing:-.01em}
.contact-card{background:var(--bg-1);border:1px solid var(--line);border-radius:16px;padding:32px;position:relative;overflow:hidden}
.contact-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(145,71,255,.6),rgba(244,114,182,.6),transparent)}
.plink{display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border-radius:8px;background:var(--bg-3);border:1px solid var(--line-2);color:var(--ink);text-decoration:none;font-size:.9rem;font-weight:500;transition:all .18s ease}
.plink:hover{background:var(--bg-2);border-color:var(--purple-2);color:var(--purple-2)}
.plink svg{width:14px;height:14px}
.plink.primary{background:var(--grad);color:#fff;border-color:transparent}
.plink.primary:hover{background:var(--grad);color:#fff;transform:translateY(-1px);box-shadow:0 10px 24px rgba(145,71,255,.4)}
footer{padding:60px 0 50px;border-top:1px solid var(--line);position:relative;z-index:1}
.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:56px;margin-bottom:48px}
@media(max-width:720px){.foot-grid{grid-template-columns:1fr;gap:36px}}
.foot-col h5{font-family:'JetBrains Mono',monospace;font-size:.72rem;text-transform:uppercase;letter-spacing:.12em;color:var(--purple-2);margin-bottom:14px}
.foot-col a{display:block;color:var(--ink-2);text-decoration:none;padding:5px 0;font-size:.92rem;transition:color .15s ease}
.foot-col a:hover{color:var(--ink)}
.foot-tag{font-size:1rem;color:var(--ink-2);line-height:1.6;max-width:360px;text-wrap:pretty}
.foot-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:28px;border-top:1px solid var(--line);font-family:'JetBrains Mono',monospace;font-size:.8rem;color:var(--ink-3);flex-wrap:wrap;gap:16px}
.foot-bottom .built{display:inline-flex;align-items:center;gap:8px}
.foot-bottom .built .dot{width:6px;height:6px;border-radius:50%;background:var(--purple-2);box-shadow:0 0 8px var(--purple-2)}
.reveal{opacity:0;transform:translateY(20px);transition:opacity .7s ease,transform .7s ease}
.reveal.in{opacity:1;transform:none}
</style>
</head>
<body>
<nav class="nav">
  <div class="nav-inner">
    <div class="nav-brand"><span class="dot"></span><span>${escapeHtml(ensName)}</span></div>
    <div class="nav-links">
      <a href="#watch">Watch</a>
      <a href="#schedule">Schedule</a>
      ${games.length > 0 ? '<a href="#games">Games</a>' : ""}
      <a href="#support">Support</a>
      ${
        twitchHref
          ? `<a href="${escapeHtml(twitchHref)}" target="_blank" class="nav-cta${
              isLive ? " live" : ""
            }">${SVG.twitch} ${isLive ? "● LIVE NOW" : "Watch live"}</a>`
          : ""
      }
    </div>
  </div>
</nav>
<main>
<header class="hero">
  <div class="container">
    <div class="hero-inner">
      <div>
        <div class="hero-eyebrow"><span class="live"></span><span>${
          isLive ? "● Live right now" : "// Live on Twitch · Streaming weekly"
        }</span></div>
        <h1>${heroH1}</h1>
        <p class="hero-bio">I'm <b style="color:var(--ink)">${escapeHtml(
          ensName
        )}</b> — ${bio}</p>
        <div class="hero-actions">
          ${
            twitchHref
              ? `<a href="${escapeHtml(
                  twitchHref
                )}" class="btn btn-primary" target="_blank">${SVG.play} Watch on Twitch ${SVG.arrowRight}</a>`
              : `<a href="#watch" class="btn btn-primary">${SVG.play} Watch the stream ${SVG.arrowRight}</a>`
          }
          ${
            donateUrl
              ? `<a href="${escapeHtml(
                  donateUrl
                )}" class="btn btn-ghost" target="_blank">${SVG.heart} Tip the stream</a>`
              : `<a href="#support" class="btn btn-ghost">${SVG.heart} Support the stream</a>`
          }
        </div>
        <div class="hero-stats">
          <div class="stat"><div class="stat-num">${escapeHtml(
            games.length ? String(games.length) : "—"
          )}</div><div class="stat-label">Games on rotation</div></div>
          <div class="stat"><div class="stat-num">${escapeHtml(
            String(Object.keys(schedule).length || (scheduleRaw ? "?" : "—"))
          )}</div><div class="stat-label">Streams / week</div></div>
          <div class="stat"><div class="stat-num">${
            isLive ? `<span style="color:var(--red)">● LIVE</span>` : "Offline"
          }</div><div class="stat-label">Current status</div></div>
        </div>
      </div>
      <div class="profile-frame">
        <div class="profile-glow"></div>
        <div class="profile-card">
          ${
            profileImg
              ? `<img src="${escapeHtml(profileImg)}" alt="${name}">`
              : `<div style="width:100%;height:100%;background:linear-gradient(135deg,#9147ff,#f472b6);"></div>`
          }
          <div class="profile-tag"><span>${escapeHtml(
            twitch ? `@${twitch}` : ensName
          )}</span><span class="role">${
    isLive ? "● live" : "streamer"
  }</span></div>
        </div>
        <div class="profile-meta">
          <div class="profile-meta-row"><span>now</span><b>${escapeHtml(
            currentGame
          )}</b></div>
          <div class="profile-meta-row"><span>next</span><b>${escapeHtml(
            scheduleSummary
          )}</b></div>
          <div class="profile-meta-row"><span>status</span><b style="color:${
            isLive ? "var(--red)" : "var(--purple-2)"
          }">${isLive ? "● live now" : "● offline"}</b></div>
        </div>
      </div>
    </div>
  </div>
</header>
${connectStripHTML}
${playerHTML}
${scheduleHTML}
${gamesHTML}
${supportHTML}
</main>
<footer>
  <div class="container">
    <div class="foot-grid">
      <div class="foot-col">
        <div class="nav-brand" style="margin-bottom:16px;"><span class="dot"></span><span>${escapeHtml(
          ensName
        )}</span></div>
        <p class="foot-tag">${escapeHtml(
          profileData.bio || "Live on Twitch — streaming the grind."
        )}</p>
      </div>
      <div class="foot-col">
        <h5>Stream</h5>
        ${twitchHref ? `<a href="${escapeHtml(twitchHref)}" target="_blank">Watch on Twitch</a>` : ""}
        <a href="#schedule">Schedule</a>
        ${games.length > 0 ? '<a href="#games">Games</a>' : ""}
        ${donateUrl ? `<a href="${escapeHtml(donateUrl)}" target="_blank">Tip / Donate</a>` : ""}
      </div>
      <div class="foot-col">
        <h5>Elsewhere</h5>
        ${tw ? `<a href="${escapeHtml(tw)}" target="_blank">X / Twitter</a>` : ""}
        ${yt ? `<a href="${escapeHtml(yt)}" target="_blank">YouTube</a>` : ""}
        ${dc ? `<a href="${escapeHtml(dc)}" target="_blank">Discord</a>` : ""}
        ${email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : ""}
      </div>
    </div>
    <div class="foot-bottom">
      <span>© ${new Date().getFullYear()} ${escapeHtml(
    ensName
  )} — Streaming on Twitch, hosted on IPFS.</span>
      <span class="built"><span class="dot"></span>Built with buildsite.eth</span>
    </div>
  </div>
</footer>
<script>
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
</script>
</body>
</html>`;
}

export function StreamerTemplate({ profileData, ensName, uploadedImages }: Props) {
  const html = generateStreamerHTML(profileData, ensName, uploadedImages);
  return (
    <iframe
      srcDoc={html}
      className="w-full h-full border-0"
      title="Streamer Preview"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
