import { fileStreamResponse } from "$lib/functions";
import type { RequestHandler } from "@sveltejs/kit";


export const GET = (async ({ request }) => {
  return fileStreamResponse(request, "static/audio/constant-moderato.mp3", "audio/mpeg");
}) satisfies RequestHandler;
