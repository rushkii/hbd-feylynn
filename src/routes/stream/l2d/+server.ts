import { read } from "$app/server";
import type { RequestHandler } from "@sveltejs/kit";


export const GET = (async () => {
  return read("/static/video/yuuka-sports.webm");
}) satisfies RequestHandler;
