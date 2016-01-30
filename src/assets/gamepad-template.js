import { div, table, tbody, tr, td, a } from '@cycle/dom';

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
                                    "id": {
                                        "name": "id",
                                        "value": "action1"
                                    }
                                })
                            ]),
                            td([
                                a("#action2.btn.btn-lg.btn-default", {
                                    "attributes": {
                                        "href": "#",
                                        "role": "button",
                                        "className": "btn btn-lg btn-default"
                                    },
                                    "id": {
                                        "name": "id",
                                        "value": "action2"
                                    }
                                })
                            ]),
                            td([
                                a("#action3.btn.btn-lg.btn-default", {
                                    "attributes": {
                                        "href": "#",
                                        "role": "button",
                                        "className": "btn btn-lg btn-default"
                                    },
                                    "id": {
                                        "name": "id",
                                        "value": "action3"
                                    }
                                })
                            ])
                        ]),
                        tr([
                            td([
                                a("#ritual1.btn.btn-lg.btn-default.disabled", {
                                    "attributes": {
                                        "href": "#",
                                        "role": "button",
                                        "className": "btn btn-lg btn-default disabled"
                                    },
                                    "id": {
                                        "name": "id",
                                        "value": "ritual1"
                                    }
                                })
                            ]),
                            td([
                                a("#ritual2.btn.btn-lg.btn-default.disabled", {
                                    "attributes": {
                                        "href": "#",
                                        "role": "button",
                                        "className": "btn btn-lg btn-default disabled"
                                    },
                                    "id": {
                                        "name": "id",
                                        "value": "ritual2"
                                    }
                                })
                            ]),
                            td([
                                a("#ritual3.btn.btn-lg.btn-default.disabled", {
                                    "attributes": {
                                        "href": "#",
                                        "role": "button",
                                        "className": "btn btn-lg btn-default disabled"
                                    },
                                    "id": {
                                        "name": "id",
                                        "value": "ritual3"
                                    }
                                })
                            ])
                        ])
                    ])
                ])
            ])
        ])
    ])
    ]);
}