import { BasicComponent } from "../../core/BasicComponent";

export class Output extends BasicComponent {
    static className = 'country-info'

    toHTML() {
        return `
                <h2 class="country-info__header">Your country is:</h2>
                <div class="country-info__output"></div>
        `
    }
}