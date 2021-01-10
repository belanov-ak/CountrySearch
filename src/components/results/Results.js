import { BasicComponent } from "@core/BasicComponent";
import { getAPIResponse } from "@core/fetch";
import { $ } from "@core/dom";
import { displayCountriesList} from "./results.functions";

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
            <div class="results" data-type="results">
                <h2 class="results__header">Search results:</h2>
                <div class="results__output" data-type="search-result"></div>
            </div>
        `
    }

    init() {
        super.init()

        this.emitter.subscribe('toFetch', value => {getAPIResponse(value)
            .then((data) => {
                console.log(data)
                if (!data.singleCounrty && data[0]) {
                    displayCountriesList(data)
                }
                return data
            })
        })

        this.emitter.subscribe('codeRequest', () => {this.$root.clearHTML()})
    }

    onClick(event) {
        if ($(event.target).data.type === 'show-button') {
            const $button = $(event.target)
            const $parent = $button.closest('[data-type="country-block"]')
            const $country = $parent.find('[data-type="country-name"]')
            
            this.emitter.emit('toFetch', $country.text())
        }
    }
}
