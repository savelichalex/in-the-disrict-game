import { div, label, input, a } from '@cycle/dom';

export function getFormTeplate() {
    return div('.form-horizontal.visible-sm.visible-xs', [
        div('.form-group', [
            label('.col-sm-2.control-label', 'Name'),
            div('.col-sm-10', [
                input('#user_name.form-control', {type: 'text'})
            ])
        ]),
        div('.form-group', [
            label('.col-sm-2.control-label', 'District'),
            div('.col-sm-10', [
                input('#key.form-control', {type: 'text'})
            ])
        ]),
        div('.form-group', [
            div('.col-sm-offset-2.col-sm-10', [
                a('#join.btn.btn-lg.btn-success', 'Join to guys')
            ])
        ])
    ]);
}