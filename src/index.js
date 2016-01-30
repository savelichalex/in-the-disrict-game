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

app.io.user(function* (next) {
	console.log('someone connected');

	yield next;

	//on disconnect
	if(this.joined) {
		//delete from gamepads if needed

		games.get(this.key).emit('user left', this.username);
	}
});

//Routes

app.io.router('create game', function* (next) {
	function createKey() {
		const key = Math.floor(Math.random() * 1000);
		if(games.has(key)) {
			return createKey;
		} else {
			return key;
		}
	}
	const key = createKey();
	games.set(key, this);

	this.emit.('game created', key);
});

app.io.route('join game', function* (next, {key, username}) {
	if(games.has(key)) {
		this.joined = true;
		this.key = key;
		this.username = username;

		games.get(key).emit('user joined'. username);
	}
});

app.io.route('move', function* (next, {direction}) {
	if(this.joined) {
		games.get(this.key).emit('move', {
			username: this.username,
			direction
		});
	}
});

app.io.route('action', function* (next, {action}) {
	if(this.joined) {
		games.get(this.key).emit('action', {
			username: this.username,
			action
		});
	}
})