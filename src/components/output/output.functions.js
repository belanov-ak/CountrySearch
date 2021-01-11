import { $ } from '@core/dom'
const params = ['name', 'flag', 'alpha3Code', 'languages', 'borders']

export function resizeOutput($root, width, margin) {
    $root.css({
        width: width,
        margin: margin
    })
}

export function shouldRemoveFavButton(arr) {
    if (arr[0].text()) {
        console.log(arr[0].text())
    }
}

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

export function displayCountryInfo(parsedArr, arrOfFavourites = [], $root) {
    const $button = $root.find('[data-type="favourites-button"]')
    $button.css({
        display: 'block'
    })
    if (arrOfFavourites.find(el => el === parsedArr[0])) {
        $button.css({
            display: 'none'
        })
    }
    
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
            const url = parsedArr[i].includes('https://')
                ? url = parsedArr[i]
                : url = 'No Data'
            checkedArr[i].clear()

            checkedArr[i].img(url)

            if(parsedArr[i] === 'No Data') {
                checkedArr[i].css({
                    opacity: 0
                })
            }
            //checking for suitable strings
            else if (typeof parsedArr[i] === 'string') {
                
                checkedArr[i].css({
                    opacity: 1
                })

                checkedArr[i].text(parsedArr[i])

            //searching and parse nested parameters
            } else if (typeof parsedArr[i] === 'object') {

                for (var j = 0; j < parsedArr[i].length; j++) {
                    

                    if (typeof parsedArr[i][j] === 'string') {

                        checkedArr[i].css({
                            opacity: 1
                        })

                        const $el = $root.find('[data-field="bordering-countries"]')
                        function createDiv(content) {
                            return `
                                <div class="bordering-country" data-type="border-country">${content}</div>
                            `
                        }

                        $el.html(createDiv(parsedArr[i][j]))

                    } else if (typeof parsedArr[i][j] === 'object'){

                        checkedArr[i].css({
                            opacity: 1
                        })

                        checkedArr[i].text(parsedArr[i][j].name)
                    }
                }
            }
        }
    }
    layoutCountryInfo(cardFields)
}