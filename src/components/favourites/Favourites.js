import { BasicComponent } from '@core/BasicComponent';
import { displayFavList } from './favourites.functions';
import { checkThisString } from '@core/utils';
import { $ } from '@core/dom'

export class Favourites extends BasicComponent{
    static className = 'favourites-list'

    constructor($root, options) {
        super($root, {
            name: 'Favourites',
            listeners: ['click'],
            ...options
        })

        this.countriesList = []
    }

    toHTML() {
        return `
            <h1 class="favourites-list__header">Favourites list</h1>
            <div class="favourites-list__output" data-type="favourites-output"><div>
        `
    }

    init() {
        super.init()

        this.emitter.subscribe('addToFavourites', string => {
            if (checkThisString(string, this.countriesList)) {
                this.countriesList.push(string)

                displayFavList(this.countriesList, this.$root)
            }
        })

        this.emitter.subscribe('updateFavourites', arr => {
            if (arr.length == 0) {
                this.$root.css({
                    display: 'none'
                })
            } else {
                displayFavList(arr, this.$root)
            }
        })
    }

    onClick(event) {
        if ($(event.target).data.type='favourites-remove') {
            const index = $(event.target).data.index
            const $item = this.$root.find(`[data-type="favourites-name${index}"]`)
            const countryName = $item.text()
            this.countriesList = this.countriesList.filter(el => el !== countryName)
            this.emitter.emit('updateFavourites', this.countriesList)
        }
    }
}