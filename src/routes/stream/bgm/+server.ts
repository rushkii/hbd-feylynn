import { read } from "$app/server";
import type { RequestHandler } from "@sveltejs/kit";


export const GET = (async () => {
  return read("/static/audio/constant-moderato.mp3");
}) satisfies RequestHandler;
