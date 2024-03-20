class StandardizedResponse {
    raw = ""
    constructor(text) {
        this.raw = text
    }
    isgood = function() {
        return this.raw.startsWith("G")
    }
    getResult = function() {
        return this.raw.substring(1)
    }
}