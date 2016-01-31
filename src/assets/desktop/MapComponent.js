import { getInitialMapTemplate } from './map-template';

class User {

}

const Users = new Map();

const Game = {}

export function MapComponent(Socket) {
	const move$ = Socket.get('move')
		.map(({direction, username}) => Users.get(username).moveTo(direction));

	const action$ = Socket.get('action')
		.map(({action, username}) => Users.get(username).do(action));

	const newPlayer$ = Socket.get('user joined')
		.map(username => Users.set(username, new User(username)));

	const initialMap$ = Socket.get('game created')
		.map(key => {
			Game.key = key;
			return getInitialMapTemplate(key)
		});

	return initialMap$;
}