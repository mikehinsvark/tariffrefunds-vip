/** Design reminder — deployment-aware asset resolver keeps the training UI portable between Manus and GitHub Pages. */
const githubReleaseAssets: Record<string, string> = {
  "tra-command-mark.png": "https://github.com/mikehinsvark/tariffrefunds-vip/releases/download/static-assets-v1/tra-command-mark.png",
  "01-hidden-refund-opportunity.png": "https://github.com/mikehinsvark/tariffrefunds-vip/releases/download/static-assets-v1/01-hidden-refund-opportunity.png",
};

export function assetUrl(storageFile: string, exportedFile: string) {
  return import.meta.env.VITE_STATIC_EXPORT === "true"
    ? githubReleaseAssets[exportedFile] ?? `/assets/${exportedFile}`
    : `/manus-storage/${storageFile}`;
}
