

function getRandomizedList(frequencies, count){
    var buckets = getItemBuckets(frequencies, count);

    var list = [];

    var numItems = getTotalItemsCount(buckets);

    for (var i = 0; i < numItems; i++){
        var safteyCount = count * 3;
        if (buckets.length == 0){
            console.error("Error::Bucket is empty!!!");
            break;
        }
        do {
            done = false;
            var item = Math.floor(Math.random() * buckets.length);
            if (buckets.hasOwnProperty(item)) {
                list.push(buckets[item].key);
                buckets[item].used = buckets[item].used + 1;
                if (buckets[item].used == buckets[item].count){
                    buckets = removeBucket(buckets, buckets[item].key);
                }
                done = true;    
            }
            safteyCount--;
            if (safteyCount == 0){
                console.error("Error:: safteyCount breached.!!!");
                break;
            }
        } while (!done);
    }

    remaining = count - list.length;
    for(i = 0; i < remaining; i++) {
        item = Math.floor(Math.random() * frequencies.length);
        list[list.length] = item;
    }

    return list;
}

function removeBucket(buckets, key){
    buckets = buckets.filter(element => {
        return element.key !== key;
    });

    return buckets;
}

function getTotalItemsCount(buckets){
    var total = 0;
    buckets = buckets.forEach(element => {
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

module.exports.getRandomizedList = getRandomizedList;
