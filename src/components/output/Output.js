import { BasicComponent } from "@core/BasicComponent";
import {countriesOutput } from "./countriesOutput";
import { $ } from '@core/dom'
import { getAPIResponse, getResponseByCode } from "@core/fetch";
import { parseData, displayCountryInfo, createVoidArray } from "./output.functions";

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

        this.emitter.subscribe('toFetch', value => {
            getAPIResponse(value)
            .then((data) => {
                var arr
                if (data.singleCounrty) {
                    
                    arr = parseData(data)
                } else {
                    arr = createVoidArray()
                }
                return arr
            }).then(parsedArr => displayCountryInfo(parsedArr))
        })

        this.emitter.subscribe('codeRequest', value => {
            getResponseByCode(value)
            .then(data => parseData(data))
            .then(parsedArr => displayCountryInfo(parsedArr))
        })
    }

    onClick(event) {
        if( $(event.target).data.type === 'border-country') {
            const $country = $(event.target)

            this.emitter.emit('codeRequest', $country.text())
        }
    }
}