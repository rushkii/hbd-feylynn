import { fileStreamResponse } from "$lib/functions";
import type { RequestHandler } from "@sveltejs/kit";


export const GET = (async ({ request }) => {
  console.log(process.cwd())
  return fileStreamResponse(request, process.cwd() + "/static/audio/constant-moderato.mp3", "audio/mpeg");
}) satisfies RequestHandler;
