import { $ } from '@core/dom'
const params = ['name', 'flag', 'alpha3Code', 'languages', 'borders']

export function parseData(data) {
    const parsedArr = []

    for (let i = 0; i < params.length; i++) {
        parsedArr.push(data[params[i]])
    }

    return parsedArr
}




export function displayCountryInfo(arr) {

    const $root = $(document.querySelector('[data-field="country-card"]'))

    //create array of DOM elements, and connect it with layout
    function createCardFields() {
        const fieldsNames = ['name','img','code','language','bordering-countries']

        for (let i = 0; i < fieldsNames.length; i++) {
            fieldsNames[i] = $root.find(`[data-field="${fieldsNames[i]}"]`)
        }
        return fieldsNames
    }

    const cardFields = createCardFields()

    //Loops through and displays all information about the country
    function layoutCountryInfo(checkedArr) {
        const substring = 'https://'

        for (var i = 0; i<checkedArr.length; i++) {

            checkedArr[i].clear()

            if (arr[i].includes(substring)) {
                console.log(checkedArr[i])
                checkedArr[i].img(arr[i])
                
            } else if (typeof arr[i] === 'string') {
                checkedArr[i].text(arr[i])

            } else if (typeof arr[i] === 'object') {
                for (var j = 0; j < arr[i].length; j++) {

                    if (typeof arr[i][j] === 'string') {
                        console.log(arr[i][j])
                        checkedArr[i].text(arr[i][j])

                    } else if (typeof arr[i][j] === 'object'){
                        checkedArr[i].text(arr[i][j].name)
                    }
                }
            }
        }
    }
    layoutCountryInfo(cardFields)
}