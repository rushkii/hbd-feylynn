import { fileStreamResponse } from "$lib/functions";
import type { RequestHandler } from "@sveltejs/kit";
import path from "path";


export const GET = (async ({ request }) => {
  return fileStreamResponse(request, path.resolve("static/audio/constant-moderato.mp3"), "audio/mpeg");
}) satisfies RequestHandler;
