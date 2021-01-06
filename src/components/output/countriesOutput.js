export function countriesOutput() {
    return `
        <div class="country-info">
        <h2 class="country-info__header">Your country is:</h2>
        <div class="country-info__output">

        <div class="country-card-header">
            <h3 class="country-card-header__name">Country name</h3>
            <button class="country-card-header__like-button">Add to favourites</button>
        </div>
        
        <div class="country-card-body">

            <div class="country-card-body__flag">IMG</div>

            <div class="country-card-body__info">

                <div class="info-code">
                    <h4 class="info-code__header">Code of the counrty:</h4>
                    <div class="info-code__body">Code</div>
                </div>

                <div class="info-language">
                    <h4 class="info-language__header">Languages of the country:</h4>
                    <div class="info-language__body">Language</div>
                </div>

                <div class="info-bordering-countries">
                    <h4 class="info-bordering-countries__header">This country bordering with:</h4>
                    <div class="info-bordering-countries__body">Countries</div>
                </div>

            </div>
        </div>
            
        </div>
    </div>
    `
}