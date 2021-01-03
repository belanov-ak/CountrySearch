import { DomListener } from "./DOMListener";

export class BasicComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
    }

    toHTML() {
        return ''
    }

    init() {
        this.initDOMListeners()
    }

    destroy() {
        this.removeDOMlisteners()
    }
}