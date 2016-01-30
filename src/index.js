'use strict';

import serve from 'koa-static-folder';
import koa from 'koa.io';
import path from 'path';
import fs from 'fs';

const app = koa();
const port = process.env.PORT || 3000;

app.use(serve('./src/static'));

app.use(function* (next) {
	yield next;
	if(this.path === '/') {
		this.body = fs.createReadStream(path.join(__dirname, 'web', 'index.html'));
		this.type = 'html';
	}
});

app.listen(port, function() {
	console.log('Server listening at port %d', port);
});

const games = new Map();
const firstKey = '0001';