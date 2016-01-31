import { div, a, h1 } from '@cycle/dom';

export function getFormTeplate() {
	return div(".fader", [
		div(".container", [
			div(".jumbotron", [
				h1([ `На районе` ]),
				div('#form-wrapper', [
					div("#add_district_block", [
						a("#add_district.btn.btn-lg.btn-success.visible-md", {
							"attributes": {
								"href": "#",
								"role": "button",
								"className": "btn btn-lg btn-success visible-md"
							}
						}, [ `Create district` ])
					])
				])
			])
		])
	]);
}