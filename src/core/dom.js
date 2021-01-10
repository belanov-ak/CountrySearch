class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    text(text) {
        if (typeof text === 'string') {
            this.$el.textContent = text
            return this
        }
        return this.$el.textContent.trim()
    }

    clear() {
        this.$el.textContent = ''
    }

    img(url) {
        this.$el.src = url
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    html(html) {
        if(typeof html === 'string') {
            this.$el.innerHTML = this.$el.innerHTML + html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    clearHTML() {
        this.$el.innerHTML = ''
    }

    get data() {
        return this.$el.dataset
    }

    get outerText() {
        return this.$el.outerText
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    getLastElementChildCoords() {
        return this.$el.lastElementChild.getBoundingClientRect()
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }

    removeClass(className) {
        this.$el.classList.remove(className)
        return this
    }

    css(styles = {}) {
        Object.keys(styles)
        .forEach(key => {
          this.$el.style[key] = styles[key]
        })
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }

        if(Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
        return this
    }
}


export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}