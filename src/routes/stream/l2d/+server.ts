import { read } from "$app/server";
import { fileStreamResponse } from "$lib/functions";
import type { RequestHandler } from "@sveltejs/kit";


export const GET = (async ({ request }) => {
  const fileRead = read("static/video/yuuka-sports.webm");
  return fileStreamResponse(request, await fileRead.text() , "video/webm");
}) satisfies RequestHandler;
