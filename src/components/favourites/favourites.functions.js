function createNewItem(str, index) {
    return `
    <div class ="favourites-list__wrap">
        <div class="favourites-list__item">
            <div class="favourites-list__item-id">${index + 1}</div>
            <div class="favourites-list__item-name" data-type="favourites-name${index}">${str}</div>
        </div>    
            <button class="favourites-list__remove-button" data-type="favourites-remove" data-index="${index}">Remove</button>
    </div>
    `
}

function resizeOutput ($parent, $el) {
    const coords = $parent.getCoords()
    const lastChildCoords = $el.getLastElementChildCoords()
    const itemHeight = 25
    const blockHeight = 60
    const delta = lastChildCoords.top - coords.top + itemHeight
    
    $el.css({
        height: +delta + 'px'
    })
    $parent.css({
        height: +delta + blockHeight + 'px'
    }) 
}

export function displayFavList(arr, $root) {
    const $output = $root.find('[data-type="favourites-output"]')
    if ($output === 'null') {
        return false
    }
    $output.clearHTML()

    $root.css({
        display: 'block'
    })

    const indexedListElements = (arr.map(createNewItem))
    
    indexedListElements.forEach(block => $output.html(block))

    resizeOutput($root, $output)
}