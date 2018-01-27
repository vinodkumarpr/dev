
function getRandomizedList(list, requiredCount){
    var indices = [];
    for (var i = 0; i < list.length; i++) indices.push(i);

    var randomList = [];
    for(var i = 0; indices.length > 0 && i < requiredCount; i++){
        var item = Math.floor(Math.random() * indices.length);
        randomList.push(list[indices[item]]);
        indices.splice(item, 1);
    }

    return randomList;
}

function getFrequencyFilledList(frequencies, count){
    var buckets = getItemBuckets(frequencies, count);
    var numItems = getBucketItemsCount(buckets);

    var list = [];

    for (var i = 0; i < numItems && buckets.length != 0; i++){
        var safteyCount = count * 3;

        do {
            done = false;
            var item = Math.floor(Math.random() * buckets.length);
            if (buckets.hasOwnProperty(item)) {
                list.push(buckets[item].key);
                if (++(buckets[item].used) == buckets[item].count){
                    buckets = buckets.filter(element => element.key !== buckets[item].key);
                }
                done = true;    
            }
            if (--safteyCount == 0){
                console.error("Error:: safteyCount breached.!!!");
                break;
            }
        } while (!done);
    }

    while(count - list.length > 0) {
        list[list.length] = Math.floor(Math.random() * frequencies.length);
    }

    return list;
}


function getBucketItemsCount(buckets){
    var total = 0;
    buckets.forEach(element => {
        total += element.count;
    });
    return total;
}

function getItemBuckets(frequencies, count){
    buckets = [];
    var added = 0;
    frequencies.forEach(frequency => {
        numItems = Math.round(frequency * count);
        buckets.push({
            "key": added++,
            "frequency":frequency,
            "count": numItems,
            "used": 0
        });
    });

    return buckets;
}

function printListStat(list){
    counts = {};
    
    list.forEach(item => {
        if (counts[item]){
            counts[item] += 1;
        } else {
            counts[item] = 1;
        }
    });
    
    for (var key in counts){
        console.log("key : " + key + ", count : " + counts[key]);
    }    
}

module.exports.getFrequencyFilledList = getFrequencyFilledList;
module.exports.getRandomizedList = getRandomizedList;