import { BasicComponent } from "@core/BasicComponent";

export class Results extends BasicComponent{
    constructor($root, options) {
        super($root, {
            name: 'Results',
            listeners: ['click'],
            ...options
        })
    }

    toHTML() {
        return `
            <div class="results">
                <h2 class="results__header">Search results:</h2>
                <div class="results__output"></div>
            </div>
        `
    }

    onClick(event) {
        console.log(event.target)
    }
}