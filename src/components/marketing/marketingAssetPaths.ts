/** Public URLs for the purchased HTML theme assets (files under `public/edumove`). */
export function marketingImage(name: string): string {
  return `/edumove/images/${name}`;
}

export function marketingIcon(name: string): string {
  return `/edumove/images/icon/${name}`;
}
