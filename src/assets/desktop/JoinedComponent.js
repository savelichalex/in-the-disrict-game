import { h1, span } from '@cycle/dom';

export function JoinedComponent(Socket) {
	const joinToGame$ = Socket.get('user joined')
		.map((username) => span(username + ' join the game'));

	const leftGame$ = Socket.get('user left')
		.map(username => span(username + ' left the game'));

	return joinToGame$.merge(leftGame$);
}