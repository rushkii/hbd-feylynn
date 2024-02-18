import { json } from '@sveltejs/kit';
import * as fs from 'fs';

export const fileStreamResponse = (request: Request, filePath: string, mimeType: string) => {
	const range = request.headers.get('Range');

	if (!range) {
		return json(
			{
				msg: 'Requires Range header'
			},
			{
				status: 416
			}
		);
	}

	const fileSize = fs.statSync(filePath).size;

	// Parse Range
	const CHUNK_SIZE = 10 ** 6; // 1MB
	const start = Number(range.replace(/\D/g, '')); // remove non digit value which will be removed by \D
	const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

	// Create headers, we can see the below results through inspect elements in Network section
	const contentLength = end - start + 1;
	const headers = {
		'Content-Range': `bytes ${start}-${end}/${fileSize}`,
		'Accept-Ranges': 'bytes',
		'Content-Length': contentLength.toString(),
		'Content-Type': mimeType
	};

	// create video read stream for this particular chunk
	const fileStream = fs.createReadStream(filePath, { start, end });

	// ignore this error
	return new Response(fileStream, { headers: headers, status: 206 });
};
