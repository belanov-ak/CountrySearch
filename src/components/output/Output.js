import { BasicComponent } from "@core/BasicComponent";
import {countriesOutput } from "./countriesOutput";
import { $ } from '@core/dom';
import { getAPIResponse, getResponseByCode } from "@core/fetch";
import { checkThisString} from "@core/utils"
import { parseData, displayCountryInfo, createVoidArray, resizeOutput } from "./output.functions";

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
            }).then(parsedArr => {
                displayCountryInfo(parsedArr)
            }).then(parsedArr => console.log(parsedArr))
        })

        this.emitter.subscribe('codeRequest', value => {
            getResponseByCode(value)
            .then(data => parseData(data))
            .then(parsedArr => displayCountryInfo(parsedArr))
        })

        this.emitter.subscribe('addToFavourites', string => {
            if (checkThisString(string, [])) {
                resizeOutput(this.$root, '75%', '0')
            }
        })

        this.emitter.subscribe('updateFavourites', arr => {
            if (arr.length == 0) {
                resizeOutput(this.$root, '90%', '0 auto')
            }
        })
    }

    onClick(event) {
        if( $(event.target).data.type === 'border-country') {
            const $country = $(event.target)

            this.emitter.emit('codeRequest', $country.text())
        }

        if( $(event.target).data.type === 'favourites-button') {
            const countryName = this.$root.find('[data-field="name"]')
            
            this.emitter.emit('addToFavourites', countryName.text())
        }
    }
}