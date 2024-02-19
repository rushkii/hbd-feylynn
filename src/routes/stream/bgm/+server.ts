import { read } from "$app/server";
import { fileStreamResponse } from "$lib/functions";
import type { RequestHandler } from "@sveltejs/kit";


export const GET = (async ({ request }) => {
  const fileRead = read("static/audio/constant-moderato.mp3");
  return fileStreamResponse(request, await fileRead.text(), "audio/mpeg");
}) satisfies RequestHandler;
