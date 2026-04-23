export function isApplePlatform(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
}
export function getMapsUrl(lat: number, lng: number, name: string): string {
  if (isApplePlatform()) return `https://maps.apple.com/?ll=${lat},${lng}&q=${encodeURIComponent(name)}`;
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}
