import { OG_KEYS, ogCard, renderOg } from "@/lib/og";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return OG_KEYS.map((key) => ({ key }));
}

export async function GET(_req: Request, { params }: RouteContext<"/og/[key]">) {
  const { key } = await params;
  const card = ogCard(key);
  if (!card) return new Response("Not found", { status: 404 });
  return renderOg(card);
}
