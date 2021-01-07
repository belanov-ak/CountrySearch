import { BasicComponent } from "@core/BasicComponent";
import {countriesOutput } from "./countriesOutput";
import { getAPIResponse } from "./fetch";
import { parseData, displayCountryInfo } from "./output.functions";

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

    init() {
        super.init()

        
        this.emitter.subscribe('toFetch', value => {getAPIResponse(value)
            .then((data) => {
                if (data.singleCounrty) {
                    var arr = parseData(data)
                }
                return arr
            }).then((parsedArr) => displayCountryInfo(parsedArr))
        })
        
    }

    onClick(event) {
        console.log(event.target)
    }
}