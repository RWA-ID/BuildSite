import imageCompression from "browser-image-compression";

export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function compressImage(
  file: File,
  isProfile: boolean
): Promise<File> {
  return imageCompression(file, {
    maxSizeMB: isProfile ? 0.2 : 0.4,
    maxWidthOrHeight: isProfile ? 800 : 1200,
    useWebWorker: true,
  });
}
