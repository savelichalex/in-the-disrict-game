import { div, h1, img } from '@cycle/dom';

export function getInitialMapTemplate(key) {
	return div('.map-wrapper', [
		img({src: '/src/static/img/map.png'}),
		div('#map-console', [
			h1('.game-key', 'District id: ' + [key])
		])

	])
}

export function getMapTemplate(key, Users) {
	const usersCoords = Object.keys(Users).map(key => Users[key]).map(user => user.coords).map(([x, y]) => {
		return div('.player', {
			style: {
				top: x / 240 + 'px',
				left: y / 135 + 'px'
			}
		})
	});

	return div([
		h1('.game-key', [key]),
		div('.map-wrapper', [
			img({src: '/src/static/img/map.png'})
		].concat(usersCoords))
	])
}