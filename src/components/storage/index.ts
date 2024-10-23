const baseFolder = `/images`;

export function imageFromSupabase(filename: string): string {
  return `${baseFolder}/${filename}`;
}
