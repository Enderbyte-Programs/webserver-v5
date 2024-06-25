var quotes = new Array(
    "\"Never interrupt your enemy when he is making a mistake.\"",
    "\"Religion is what keeps the poor from murdering the rich.\"",
    "\"Impossible is a word to be found only in the dictionary of fools.\"",
    "\"Women should stick to knitting.\"",
    "\"A picture is worth a thousand words.\"",
    "\"Death is nothing, but to live defeated and inglorious is to die daily.\"",
    "\"Ten people who speak make more noise than ten thousand who are silent.\"",
    "\"Victory belongs to the most persevering.\"",
    "\"The surest way to remain poor is to be honest.\"",
    "\"Would you really shoot your emperor??\""
)
var pointer = 0;

function update() {
    document.getElementById("quote").innerText = quotes[pointer]
}

function nextq() {
    pointer++
    if (pointer > quotes.length - 1) {
        pointer = 0
    }
    update()

}

function preq() {
    pointer--
    if (pointer < 0) {
        pointer = quotes.length - 1
    }
    update()
}