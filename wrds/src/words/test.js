var randomizer = require("./randomizer.js")
var questionselection = require("../../data/questionselection.json")

function fill(count){
    var list = [];
    for(var i = 0; i < count; i++) list.push(i);

    return list;
}

function testRandomList(){
    var lists = [];
    var trials = 50;
    var listSize = 10;
    var count = 5;

    for (var i = 0; i < trials; i++) {
        lists.push(randomizer.getRandomizedList(fill(listSize), count));
    }

    for (var trial = 0; trial < trials; trial++){
        var text = trial + 1 + "";
        for (var i = 0; i < count; i++) {
            text = text + "," + lists[trial][i];
        }
        console.log(text);
    }
}

function testFrequencyFill(){

    var frequencies = questionselection.questiontypes.map(
        type => type.frequency
    )

    var trials = 20;
    var count = 50;
    var lists = [];
    for (var i = 0; i < trials; i++){
        var list = randomizer.getFrequencyFilledList(frequencies, count);
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

//testFrequencyFill();
testRandomList();
