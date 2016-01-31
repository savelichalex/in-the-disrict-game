import { div, h1, img } from '@cycle/dom';

export function getInitialMapTemplate(key) {
	return div([
		h1('.game-key', [key]),
		div('.map-wrapper', [
			img({src: '/src/static/img/map.png'})
		])
	])
}