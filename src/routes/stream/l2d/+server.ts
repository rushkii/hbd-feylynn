import { read } from '$app/server';
import type { RequestHandler } from '@sveltejs/kit';

import l2dVideo from '$static/video/yuuka-sports.webm';


export const GET = (async () => {
  return read(l2dVideo);
}) satisfies RequestHandler;
