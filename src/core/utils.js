export function capitalize (string) {
    if (typeof string !== 'string') {
        return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function checkThisString(str, arr = []) {
    const placeHolders = ['Country name', `Can't found this country`]

    if (placeHolders.find(el => el === str)) {
        return false 
    } else if (arr !== []) {
        if (arr.find(el => el === str)) {
        return false
        }
        return true
    }
}