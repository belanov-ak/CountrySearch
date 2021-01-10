import { $ } from '@core/dom'
const params = ['name', 'flag', 'alpha3Code', 'languages', 'borders']

function createBorderingCountryWrap() {`
    return <div class="bordering-country" data-type="bordering-country-button"></div>
`}

export function createVoidArray() {
    const arr = new Array(params.length)
        .fill('No Data')

    arr[0] = `Can't found this country`

    return arr
}

//return array of necessary parameters
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

        for (var i = 0; i<checkedArr.length; i++) {
            //checking for image
            const url = arr[i].includes('https://')
                ? url = arr[i]
                : url = 'No Data'
            checkedArr[i].clear()

            checkedArr[i].img(url)

            if(arr[i] === 'No Data') {
                checkedArr[i].css({
                    opacity: 0
                })
            }
            //checking for suitable strings
            else if (typeof arr[i] === 'string') {
                
                checkedArr[i].css({
                    opacity: 1
                })

                checkedArr[i].text(arr[i])

            //searching and parse nested parameters
            } else if (typeof arr[i] === 'object') {

                for (var j = 0; j < arr[i].length; j++) {
                    

                    if (typeof arr[i][j] === 'string') {

                        checkedArr[i].css({
                            opacity: 1
                        })

                        const $el = $root.find('[data-field="bordering-countries"]')
                        function createDiv(content) {
                            return `
                                <div class="bordering-country" data-type="border-country">${content}</div>
                            `
                        }

                        $el.html(createDiv(arr[i][j]))

                    } else if (typeof arr[i][j] === 'object'){

                        checkedArr[i].css({
                            opacity: 1
                        })

                        checkedArr[i].text(arr[i][j].name)
                    }
                }
            }
        }
    }
    layoutCountryInfo(cardFields)
}