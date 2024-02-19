import { fileStreamResponse } from "$lib/functions";
import type { RequestHandler } from "@sveltejs/kit";


export const GET = (async ({ request }) => {
  return fileStreamResponse(request, process.cwd() + "/static/video/yuuka-sports.webm", "video/webm");
}) satisfies RequestHandler;
