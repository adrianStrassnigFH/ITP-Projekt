export class Timer {
    constructor(elementId) {
        this.el = document.getElementById(elementId)
        this.interval = null
        this.startTime = null
    }

    start() {
        this.startTime = Date.now()
        this.el.textContent = 'Time: 0s'
        this.interval = setInterval(() => {
            const sec = Math.floor((Date.now() - this.startTime) / 1000)
            this.el.textContent = `Time: ${sec}s`
        }, 1000)
    }

    stop() {
        clearInterval(this.interval)
    }

    reset() {
        clearInterval(this.interval)
        this.startTime = null
        this.el.textContent = 'Time:'
    }
}
