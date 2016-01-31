import { div, h1, img } from '@cycle/dom';

export function getInitialMapTemplate(key) {
	return div('.map-wrapper', [
		img({src: '/src/static/img/map.png'}),
		div('#map-console', [
			h1('.game-key', 'District id: ' + [key])
		])

	])
}