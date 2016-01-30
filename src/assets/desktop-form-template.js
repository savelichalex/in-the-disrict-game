import { div, a } from '@cycle/dom';

export function getFormTeplate() {
    return div("#add_district_block", [
        a("#add_district.btn.btn-lg.btn-success.visible-lg", {
            "attributes": {
                "href": "#",
                "role": "button",
                "className": "btn btn-lg btn-success visible-lg"
            }
        }, [`Create district`])
    ]);
}