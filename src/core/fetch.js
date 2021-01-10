export async function getAPIResponse(userRequest) {
    
    try{
        async function getSuitsCountriesList(string) {
            const requestURL = 'https://restcountries.eu/rest/v2/all'

            const response = await fetch(requestURL)
            const data = await response.json()
            const result = data.filter(country => country.name.match(string))
            return result
        }

        async function checkAndParseResult() {
            const countriesList = await getSuitsCountriesList(userRequest)

            var countryInfo = []

            //A block that processes an input array with one value
            if (countriesList.length === 1) {
                countryInfo = countriesList[0]
                countryInfo.singleCounrty = true

            //A block that processes an input array with many values
            } else {
                const countriesNames = countriesList.map(country => country.name)
                countryInfo = countriesNames
            }

            return countryInfo
        }
        const arr = await checkAndParseResult()
        return arr
    }
    catch (e) {
        console.error(e)
    }
}

export async function getResponseByCode(code) {
    try{
        async function getCountriesListByCode(string) {
            const requestURL = 'https://restcountries.eu/rest/v2/all'

            const response = await fetch(requestURL)
            const data = await response.json()
            const result = data.filter(country => country.alpha3Code.match(string))
            
            return result
        }

        async function parseResult() {
            const country = await getCountriesListByCode(code)
            const countryInfo = country[0]
            return countryInfo
        }

        const arr = await parseResult()
        return arr
    }
    catch (e) {
        console.error(e)
    }
}