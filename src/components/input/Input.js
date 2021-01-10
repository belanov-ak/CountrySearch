import { BasicComponent } from "@/core/BasicComponent";

export class Input extends BasicComponent {
    static className = 'input-block'

    constructor($root, options) {
        super($root, {
            name: 'Input',
            listeners: ['keydown'],
            ...options
        })
    }

    toHTML() {
        return `
                <h1 class="input-block__header">Search of any country!</h1>
                <input type="text" class="input-block__input" placeholder="Enter the name of the country here">
        `
    }

    onKeydown(event) {
        const keys = ['Enter']

        const {key} = event

        if (keys.includes(key)) {
            const value = event.target.value
            if (value !== '' && value !== ' ') {
                this.emitter.emit('toFetch', value)
            }
        }
    }
}