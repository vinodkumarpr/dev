'use strict';

class Word {
    constructor(wordobj){
        this.wordobj = wordobj;
    }

    word() {
        return this.wordobj.text;
    }

    synonyms() {
        return this.getValueAsList("SYN");
    }

    definition(){
        return this.getSingleValue("DEF");
    }

    antonyms(){
        return this.getValueAsList("ANT");
    }

    adjectives(){
        return this.getValueAsList("ADJ");
    }

    adverbs(){
        return this.getValueAsList('ADV');
    }

    nouns(){
        return this.getValueAsList('N');
    }

    examples(){
        return this.getValueAsList('S');
    }

    synonymQuestionOptions(){
        return this.getValueAsList('QSYN') + this.getValueAsList('QSYN2');
    }
        
    
    antonymQuestionOptions(){
        return this.getValueAsList('QANT') + this.getValueAsList('QANT2');    
    }
    
    sentenceQuestions(){
        return this.getValueAsList('QS') + this.getValueAsList('QS2');
    }
    
    getValue(name) {
        if (name == undefined) {
            return undefined;
        }
        var val = this.wordobj[name];
        if (val != undefined && val.text != undefined){
            return val.text;
        }
        return val;
    }

    getSingleValue(name){
        if (name == undefined) {
            return undefined;
        }
        var val = this.getValue(name);
        if (Array.isArray(val)) {
            return val[0];
        }
        return val;
    }
    
    getValueAsList(name){
        if (name == undefined) {
            return [];
        }
        var val = this.getValue(name);
        if (Array.isArray(val)) {
            return val;
        }
        var result = [];
        if (val) {
            result.push(val);
        }
        return result;
    }
    reportAll(){
        console.log("report");
        console.log("------");
        Object.getOwnPropertyNames(Word.prototype).forEach(element => {
            if (!(element === 'constructor' || element === 'report')){
                var val = this[element]();
                console.log(element + " : " + val);
            }
        });
        console.log("--------------------------");
    }
    report(){
        console.log("Word " + this.word());
    }
}

module.exports = Word;
