import { BasicComponent } from "../../core/BasicComponent";
import { countriesOutput } from "./countriesOutput";

export class Output extends BasicComponent {
    static className = 'country-info'
    constructor($root) {
        super($root, {
            name: 'Output',
            listeners: ['click']
        })
    }

    toHTML() {
        return countriesOutput()
    }

    onClick(event) {
        console.log(event.target)
    }
}