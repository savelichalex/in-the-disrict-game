import Cycle from '@cycle/core';
import Rx from 'rx';
import {div, label, input, h1, a, makeDOMDriver} from '@cycle/dom';
import { createSocketIODriver } from './cycle-socket.io';
import { getGamepadTemplate } from './gamepad-template';
import { getFormTeplate } from './mobile-form-template';

function main({Form, Socket, GamepadWrapper}) {
    const name$ = Form.select('#user_name').events('input')
        .map(e => e.target.value)
        .filter(val => val !== '');

    const key$ = Form.select('#key').events('input')
        .map(e => e.target.value)
        .filter(val => val !== '');

    const state$ = Form.select('#join').events('click')
        .combineLatest(
            name$,
            (e, name) => name
        )
        .combineLatest(
            key$,
            (name, key) => {
                console.log(name, key);
                return {
                    messageType: 'join game',
                    message: {
                        username: name,
                        key
                    }
                }
            }
        );

    const formTree$ = Rx.Observable.just(0)
        .map(() => {
            return getFormTeplate();
        });

    const joinError$ = Socket.get('uncorrect game')
        .map(() => div('', [
                div('.bg-danger', 'uncorrect game')
            ])
        );

    const joinSuccess$ = Socket.get('joined')
        .map(getGamepadTemplate);

    const action1$ = GamepadWrapper.select('#action1').events('click')
        .map(() => 1);

    const action2$ = GamepadWrapper.select('#action2').events('click')
        .map(() => 2);

    const action3$ = GamepadWrapper.select('#action3').events('click')
        .map(() => 3);


    const action4$ = GamepadWrapper.select('#action4').events('click')
        .map(() => 4);


    const action5$ = GamepadWrapper.select('#action5').events('click')
        .map(() => 5);


    const action6$ = GamepadWrapper.select('#action6').events('click')
        .map(() => 6);

    const action$ = action1$
        .merge(action2$)
        .merge(action3$)
        .merge(action4$)
        .merge(action5$)
        .merge(action6$)
        .map(action => {
            return {
                messageType: 'action',
                message: {
                    action
                }
            };
        });

    const touchmove$ = GamepadWrapper.select('#round').events('touchmove')
        .map(e => {
	        e.preventDefault();
            return {
                round: e.target,
                point: e.changedTouches[0]
            }
        });

	const touchend$ = GamepadWrapper.select('#round').events('touchend')
		.map(e => {
			return 'end';
		});

	const move$ = touchmove$.merge(touchend$);

    const interval$ = Rx.Observable.interval(100)
        .withLatestFrom(
	        move$,
	        (_, t) => t
        )
	    .filter(val => val !== 'end')
        .map(({round, point}) => {
            var roundOffsetX = round.getBoundingClientRect().left;
            var roundOffsetY = round.getBoundingClientRect().top;

            var offsetX = point.clientX - roundOffsetX;
            var offsetY = point.clientY - roundOffsetY;

            var roundHeight = round.clientHeight;
            var roundWidth = round.clientWidth;

            var roundHeightHalf = roundHeight / 2;
            var roundWidthHalf = roundWidth / 2;

            var atan = Math.atan2(roundHeightHalf - offsetY ,roundWidthHalf - offsetX);

            var direction;

            if(atan > 0.75 && atan < 2.25 ) direction = 'top';
            if(atan > 2.25 || atan < -2.25 ) direction = 'right';
            if(atan > -2.25 && atan < -0.75 ) direction = 'bottom';
            if(atan < 0.75 && atan > -0.75 ) direction = 'left';

            return direction;
        })
        .map(direction => {
            return {
                messageType: 'move',
                message: {
                    direction
                }
            };
        });

    return {
        Form: formTree$,
        Socket: state$.merge(interval$).merge(action$),
        JoinErrorWrapper: joinError$,
        GamepadWrapper: joinSuccess$
    }
}

export const mobile = () => {
    Cycle.run(main, {
        Form: makeDOMDriver('#main'),
        Socket: createSocketIODriver(window.location.origin),
        JoinErrorWrapper: makeDOMDriver('#error-wrapper'),
        GamepadWrapper: makeDOMDriver(document.body)
    });
};