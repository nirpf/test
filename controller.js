const lingq = require("./lingq");
const util = require("./util");

const getLessonText = () => {
    return lingq.getLessonText().then(result => {
        result = util.convertUnicodeToChar(result);
        result = JSON.parse(result);
        result = util.formatText(result.text);

        lessonText = result.split('.');

        if (lessonText[lessonText.length - 1] === "") {
            lessonText.pop(lessonText.length - 1)
        }

        lessonText = lessonText.map(sentence => {
            sentence = sentence.trimStart();
            sentence += ".";
            return sentence;
        })

        return lessonText;
    }).catch(error => { console.log(error) });
}

const getLessonVocabulary = () => {
    return lingq.getLessonVocabulary().then(result => {
        util.convertUnicodeToChar(result);
        result = JSON.parse(result);

        let lessonVocabulary = new Map();

        for (key in result) {

            let termKey = result[key]["term"];

            for (hint of result[key]["hints"]) {
                lessonVocabulary.set(termKey, hint.text);
            }
        }

        return lessonVocabulary;
    }).catch(error => { console.log(error) });
}

exports.getLessonText = getLessonText;
exports.getLessonVocabulary = getLessonVocabulary;