import { h1 } from '@cycle/dom';

export function JoinedComponent(Socket) {
	const joinToGame$ = Socket.get('user joined')
		.map((username) => h1(username + ' join the game'));

	const leftGame$ = Socket.get('user left')
		.map(username => h1(username + ' left the game'));

	return joinToGame$.merge(leftGame$);
}