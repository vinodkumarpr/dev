var randomizer = require("./randomizer.js")
var questions = require("../../data/questions.json")


function test(){
    var frequencies = [];
    questions.questiontypes.forEach(type => {
        frequencies.push(type.frequency);
    });

    var trials = 20;
    var count = 50;
    var lists = [];
    for (var i = 0; i < trials; i++){
        var list = randomizer.getRandomizedList(frequencies, count);
        lists[i] = list;
    }
    text = "number" ;
    for (var trial = 0; trial < trials; trial++){        
        text = text + "," + trial;
    }
    console.log(text);
    for (var i = 0; i < count; i++){
        text = i + "" ;
        for (var trial = 0; trial < trials; trial++){        
            text = text + "," + lists[trial][i];
        }
        console.log(text);
    }
}

function test1(){
    var list = seqMaker(10);
    while(!(item = list.next()).done){
        console.log("item " + item.value);
    }
}

function* seqMaker(count) {
    var index = 0;
    while (index < count)
        yield index++;
}

test();
