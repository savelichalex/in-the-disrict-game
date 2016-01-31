import Cycle from '@cycle/core';
import { makeDOMDriver } from '@cycle/dom';
import { createSocketIODriver } from 'cycle-socket.io';
import { MapComponent } from './desktop/MapComponent';
import { FormComponent } from './desktop/FormComponent';
import { JoinedComponent } from './desktop/JoinedComponent';

function main({Socket, Form}) {
    const map$ = MapComponent(Socket);
    const { startGame$, initial$ } = FormComponent(Form, Socket);
    const joined$ = JoinedComponent(Socket);

    return {
        Socket: startGame$,
        Map: map$,
        Form: initial$,
        JoinedBlock: joined$
    }
}

export const desktop = () => {
    Cycle.run(main, {
        Form: makeDOMDriver('#main'),
        Socket: createSocketIODriver(window.location.origin),
        JoinedBlock: makeDOMDriver('#joined-users'),
        Map: makeDOMDriver('#main')
    })
};
