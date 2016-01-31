import { getFormTeplate } from './desktop-form-template';
import Rx from 'rx';

export function FormComponent(Form, Socket) {
	const initial$ = Rx.Observable.just(0)
		.map(getFormTeplate);

	const startGame$ = Form.select('#add_district').events('click')
		.map(() => {
			return {
				messageType: 'create game',
				message: ''
			};
		});



	return {
		initial$,
		startGame$
	}
}