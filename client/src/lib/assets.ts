/** Design reminder — deployment-aware asset resolver keeps the training UI portable between Manus and GitHub Pages. */
export function assetUrl(storageFile: string, exportedFile: string) {
  return import.meta.env.VITE_STATIC_EXPORT === "true"
    ? `/assets/${exportedFile}`
    : `/manus-storage/${storageFile}`;
}
