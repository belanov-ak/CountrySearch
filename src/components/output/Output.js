import { BasicComponent } from "../../core/BasicComponent";
import {countriesOutput } from "./countriesOutput";

export class Output extends BasicComponent {
    static className = 'country-info'
    constructor($root, options) {
        super($root, {
            name: 'Output',
            listeners: ['click'],
            ...options
        })
    }

    toHTML() {
        return countriesOutput()
    }

    onClick(event) {
        console.log(event.target)
    }
}