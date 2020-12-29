import { BasicComponent } from "../../core/BasicComponent";

export class Input extends BasicComponent {
    static className = 'input-block'

    toHTML() {
        return `
                <h1 class="input-block__header">Search of any country!</h1>
                <input type="text" class="input-block__input" placeholder="Enter the name of the country here">
        `
    }
}