import Cycle from '@cycle/core';
import {div, label, input, h1, makeDOMDriver} from '@cycle/dom';
import { createSocketIODriver } from 'cycle-socket.io';
import Rx from 'rx';
import { getFormTeplate } from './desktop-form-template';

function main({Form, Socket}) {
    const startGame$ = Form.select('#add_district').events('click')
        .map(() => {
            console.log('sdfsdfsdf');
            return {
                messageType: 'create game',
                message: ''
            };
        });

    const startForm$ = Rx.Observable.just(0)
        .map(getFormTeplate);

    return {
        Socket: startGame$,
        Form: startForm$
    }
}

export const desktop = () => {
    Cycle.run(main, {
        Form: makeDOMDriver('#form-wrapper'),
        Socket: createSocketIODriver(window.location.origin)
    })
};