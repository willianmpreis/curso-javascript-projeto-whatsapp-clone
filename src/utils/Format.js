export default class Format {
    static getCamalCase(text) {
        let div = document.createElement("div")

        div.innerHTML = `<div data-${text}="id"></div>`

        return Object.keys(div.firstChild.dataset)[0]
    }

    static toTime(duration) {
        let seconds = parseInt((duration/1000)%60)
        let minutes = parseInt((duration/(1000*60))%60)
        let hours = parseInt((duration/(1000*60*60))%24)

        seconds = seconds.toString().padStart(2, '0')
        minutes = minutes.toString().padStart(2, '0')

        if(hours > 0) {
            return `${hours}:${minutes}:${seconds}`
        }
        return `${minutes}:${seconds}`
    }
}