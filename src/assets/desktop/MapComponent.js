import { getInitialMapTemplate, getMapTemplate } from './map-template';
import Rx from 'rx';

const GameMap = {
	maxX: 240,
	maxY: 135,
	getRandomPoint() {
		return [ Math.floor(Math.random() * this.maxX), Math.floor(Math.random() * this.maxY) ];
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
		}
		if(GameMap.isPointExist(point)) {
			this.coords = point;
			this.change();
		}
	}

	doIt(action) {
		console.log(action)
	}
}

class Bot extends User {
	constructor() {
		super('bot');

		this.money = 1000;
		this.directions = [
			'top',
			'bottom',
			'left',
			'right'
		];
		this.currentDirection = this.directions[Math.floor(Math.random() * this.directions.length)];
		this.currentDirectionCount = 0;
		this.currentDirectionCountMax = Math.floor(Math.random() * 50 + 50);
	}

	move() {
		if(this.currentDirectionCount === this.currentDirectionCountMax) {
			this.currentDirection = this.directions[Math.floor(Math.random() * this.directions.length)];
			this.currentDirectionCount = 0;
			this.currentDirectionCountMax = Math.floor(Math.random() * 50 + 50);
		} else {
			this.currentDirectionCount = this.currentDirectionCount + 1;
		}
		this.moveTo(this.currentDirection);
	}
}

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

const Bots = [];
const count = Math.floor(Math.random() * 30);
for(let i = 0; i < count; i++) {
	Bots.push(new Bot());
}

export function MapComponent(Socket) {
	const move$ = Socket.get('move')
		.subscribe(
			({direction, username}) => Users[ username ].moveTo(direction)
		);

	const action$ = Socket.get('action')
		.subscribe(({action, username}) => Users[ username ].doIt(action));

	const newPlayer$ = Socket.get('user joined')
		.subscribe(username => {
			Users[ username ] = new User(username);
			Users[ username ].change();
		});

	const map$ = Game.move$.map(() => getMapTemplate(Game.key, Users, Bots));

	const initialMap$ = Socket.get('game created')
		.map(key => {
			Game.key = key;

			Rx.Observable.interval(100)
					.subscribe(() => Bots.forEach(bot => bot.move()));

			return getInitialMapTemplate(key);
		});

	return map$.merge(initialMap$);
}