import { div, table, tbody, tr, td, a, img } from '@cycle/dom';

export function getGamepadTemplate() {
    return div('#gamepad.mobile',[
        div(".row", [
        div(".col-xs-6.col-md-6", [
            div("#round-div", [
                div("#round")
            ])
        ]),
        div(".col-xs-6.col-md-6", [
            div(".buttons", [
                table([
                    tbody([
                        tr([
                            td([
                                a("#action1.btn.btn-lg.btn-default", {
                                    "attributes": {
                                        "href": "#",
                                        "role": "button",
                                        "className": "btn btn-lg btn-default"
                                    },
                                    "id": "action1"
                                }, [
                                    img({
                                        "attributes": {
                                            "src": "/src/static/img/buttons/sig.jpg"
                                        }
                                    })
                                ])
                            ]),
                            td([
                                a("#action2.btn.btn-lg.btn-default", {
                                    "attributes": {
                                        "href": "#",
                                        "role": "button",
                                        "className": "btn btn-lg btn-default"
                                    },
                                    "id": "action2"
                                }, [
                                    img({
                                        "attributes": {
                                            "src": "/src/static/img/buttons/money.jpg"
                                        }
                                    })
                                ])
                            ]),
                            td([
                                a("#action3.btn.btn-lg.btn-default", {
                                    "attributes": {
                                        "href": "#",
                                        "role": "button",
                                        "className": "btn btn-lg btn-default"
                                    },
                                    "id": "action3"
                                }, [
                                    img({
                                        "attributes": {
                                            "src": "/src/static/img/buttons/mob.jpg"
                                        }
                                    })
                                ])
                            ])
                        ]),
                        tr([
                            td([
                                a("#action4.btn.btn-lg.btn-default", {
                                    "attributes": {
                                        "href": "#",
                                        "role": "button",
                                        "className": "btn btn-lg btn-default"
                                    },
                                    "id": "action4"
                                }, [
                                    img({
                                        "attributes": {
                                            "src": "/src/static/img/buttons/kort.jpg"
                                        }
                                    })
                                ])
                            ]),
                            td([
                                a("#action5.btn.btn-lg.btn-default", {
                                    "attributes": {
                                        "href": "#",
                                        "role": "button",
                                        "className": "btn btn-lg btn-default"
                                    },
                                    "id": "action5"
                                }, [
                                    img({
                                        "attributes": {
                                            "src": "/src/static/img/buttons/semki.jpg"
                                        }
                                    })
                                ])
                            ]),
                            td([
                                a("#action6.btn.btn-lg.btn-default", {
                                    "attributes": {
                                        "href": "#",
                                        "role": "button",
                                        "className": "btn btn-lg btn-default"
                                    },
                                    "id": "action6"
                                }, [
                                    img({
                                        "attributes": {
                                            "src": "/src/static/img/buttons/balt.jpg"
                                        }
                                    })
                                ])
                            ])
                        ])
                    ])
                ])
            ])
        ])
    ])
    ]);
}