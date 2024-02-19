import { read } from '$app/server';
import type { RequestHandler } from '@sveltejs/kit';

import bgmAudio from '$static/audio/constant-moderato.mp3';


export const GET = (async () => {
	return read(bgmAudio);
}) satisfies RequestHandler;
