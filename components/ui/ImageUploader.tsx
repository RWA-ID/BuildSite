"use client";
import { useRef, useState } from "react";
import { fileToBase64 } from "@/lib/imageUtils";

interface ImageUploaderProps {
  label: string;
  value?: string;
  onChange: (file: File, preview: string) => void;
  aspect?: "square" | "banner";
  className?: string;
}

export function ImageUploader({
  label,
  value,
  onChange,
  aspect = "square",
  className = "",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    const preview = await fileToBase64(file);
    onChange(file, preview);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  const aspectClass = aspect === "banner" ? "h-28" : "h-32 w-32 rounded-full";

  return (
    <div className={`flex flex-col items-start gap-2 ${className}`}>
      <span className="text-sm text-gray-400">{label}</span>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`relative cursor-pointer border-2 ${dragging ? "border-blue-400" : "border-white/20"} border-dashed hover:border-blue-400 transition-colors overflow-hidden flex items-center justify-center bg-white/5 ${aspectClass} ${aspect === "banner" ? "w-full rounded-xl" : ""}`}
      >
        {value ? (
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-1 text-gray-500 text-xs p-4 text-center">
            <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
            Upload {label}
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
