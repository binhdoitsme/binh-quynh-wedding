const baseUrl = process.env["NEXT_PUBLIC_SUPABASE_PUBLIC_URL"] ?? "";
const baseFolder = `https://${baseUrl}/storage/v1/object/public/wedding-images/public`;

export function imageFromSupabase(filename: string): string {
  return `${baseFolder}/${filename}`;
}
