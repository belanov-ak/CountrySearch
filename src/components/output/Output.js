import { BasicComponent } from "@core/BasicComponent";
import {countriesOutput } from "./countriesOutput";
import { $ } from '@core/dom';
import { getAPIResponse, getResponseByCode } from "@core/fetch";
import { checkThisString} from "@core/utils"
import { parseData, displayCountryInfo, createVoidArray, resizeOutput, shouldRemoveFavButton } from "./output.functions";

export class Output extends BasicComponent {
    static className = 'country-info'
    constructor($root, options) {
        super($root, {
            name: 'Output',
            listeners: ['click'],
            ...options
        })

        this.disableButtonList = []
        this.countriesList = []
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
                displayCountryInfo(parsedArr, this.disableButtonList, this.$root)
            })
        })

        this.emitter.subscribe('codeRequest', value => {
            getResponseByCode(value)
            .then(data => parseData(data))
            .then(parsedArr => displayCountryInfo(parsedArr, this.disableButtonList, this.$root))
        })

        this.emitter.subscribe('addToFavourites', string => {
            if (checkThisString(string, [])) {
                resizeOutput(this.$root, '75%', '0')
            }
        })

        this.emitter.subscribe('updateFavourites', arr => {
            this.disableButtonList = arr
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
            const $button = $(event.target)
            $button.css({
                display: 'none'
            }) 
            const firstPH = 'Country name'
            const secondPH = `Can't found this country`
            const countryName = this.$root.find('[data-field="name"]')
            var text = countryName.text()

            this.emitter.emit('addToFavourites', text)

            if (text !== firstPH && text !== secondPH) {
                if(checkThisString(text, this.disableButtonList)) {
                    this.disableButtonList.push(text)
                    this.emitter.emit('toFetch', text)
                    this.emitter.emit('updateFavourites', this.disableButtonList)
                }
            }
        }
    }
}