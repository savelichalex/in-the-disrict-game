import Cycle from '@cycle/core';
import Rx from 'rx';
import {div, label, input, h1, a, makeDOMDriver} from '@cycle/dom';
import { createSocketIODriver } from 'cycle-socket.io';
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

    const move$ = GamepadWrapper.select('#round').events('touchmove')
        .map(e => {
            return {
                round: e.target,
                point: e.changedTouches[0]
            }
        })
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
        Socket: state$.merge(move$),
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



//export const mobile = () => document.body.innerHTML = "i'm in mobile";