"use client";

export function AmbientBackground({ variant = "default" }: { variant?: "default" | "subtle" | "intense" }) {
  const opacity = variant === "subtle" ? 0.6 : variant === "intense" ? 1.2 : 1;
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[#06070a]" />

      {/* Grid */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />

      {/* Animated orbs */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full animate-float-slow"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.7 * opacity,
        }}
      />
      <div
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full animate-float"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.28) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.6 * opacity,
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-[700px] h-[700px] rounded-full animate-float-slow"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.22) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.5 * opacity,
          animationDelay: "5s",
        }}
      />
    </div>
  );
}
