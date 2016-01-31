import { getInitialMapTemplate, getMapTemplate } from './map-template';
import Rx from 'rx';

const GameMap = {
	maxX: 240,
	maxY: 135,
	getRandomPoint() {
		return [ 10, 10 ];
	},
	isPointExist([x, y]) {
		if((x > 0 && x < this.maxX) && (y > 0 && y < this.maxY)) {
			return true;
		} else {
			return false;
		}
	}
};

class User {
	constructor(username) {
		this.name = username;
		this.coords = GameMap.getRandomPoint();
		this.level = 1;
		this.authority = 0;
		this.money = 0;
	}

	change() {
		Game.move(true);
	}

	moveTo(direction) {
		console.log(direction);
		let point;
		const [x, y] = this.coords;
		switch(direction) {
			case 'top':
				point = [ x, y - 1 ];
				break;
			case 'bottom':
				point = [ x, y + 1 ];
				break;
			case 'right':
				point = [ x + 1, y ];
				break;
			case 'left':
				point = [ x - 1, y ];
				break;
				if(GameMap.isPointExist(point)) {
					this.coords = point;
					this.change();
				}
		}
	}
}
;

const Game = {
	observer: void 0,
	move$: Rx.Observable.create(observer => {
		Game.observer = observer;
	}),
	move(a) {
		this.observer.onNext(a);
	}
};

const Users = {};

export function MapComponent(Socket) {
	const move$ = Socket.get('move')
		.subscribe(
			({direction, username}) => Users[username].moveTo(direction)
		);

	const action$ = Socket.get('action')
		.map(({action, username}) => Users[username].do(action));

	const newPlayer$ = Socket.get('user joined')
		.subscribe(username => {
			Users[username] = new User(username);
			Users[username].change();
		});

	const map$ = Game.move$.map(() => getMapTemplate(Game.key, Users));

	const initialMap$ = Socket.get('game created')
		.map(key => {
			Game.key = key;
			return getInitialMapTemplate(key)
		});

	return map$.merge(initialMap$);
}