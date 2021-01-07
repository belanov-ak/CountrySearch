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
            this.$el.textContent = this.$el.textContent + ' ' + text
            return this
        }
        return this.$el.textContent.trim()
    }

    clear() {
        this.$el.textContent = ''
    }

    img(img) {
        this.$el.src = img
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    html(html) {
        if(typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
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

$.create = (tafName, classes = '') => {
    const el = document.createElement(tafName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}