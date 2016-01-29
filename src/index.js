'use strict';

import staticCache from 'koa-static-cache';
import koa from 'koa.io';
import path from 'path';
import fs from 'fs';

const app = koa();
const port = process.env.PORT || 3000;

app.use(staticCache(path.join(__dirname, 'web')));

app.use(function* () {
	this.body = fs.createReadStream(path.join(__dirname, 'web', 'index.html'));
	this.type = 'html';
});

app.listen(port, function() {
	console.log('Server listening at port %d', port);
});

const games = new Map();
const firstKey = '0001';