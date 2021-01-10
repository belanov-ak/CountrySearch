import { $ } from "@/core/dom"

function createCountryBlock(countryName, index) {
    return `
    <div class="results__block country-block" data-type="country-block" data-index="${index}">
        <div class="country-block__name" data-type="country-name">${countryName}</div>
        <button class="country-block__button" data-type="show-button" data-index="${index}">Show more</button>
    </div>
    `
}

export function displayCountriesList(arr) {
    const $results = $(document.querySelector('[data-type="results"]'))
    const $root = $results.find('[data-type="search-result"]')
    const countriesBlocks = arr.map(createCountryBlock)

    $root.clearHTML()
    countriesBlocks.forEach(block => $root.html(block))

    const rootCoords = $root.getCoords()
    const lastElementCoords = $root.getLastElementChildCoords()
    const cellSize = 70

    const delta = lastElementCoords.bottom - rootCoords.top

    $root.css({
        height: +delta + 'px'
    })

    $results.css({
        height: +delta + cellSize + 'px'
    })
}
