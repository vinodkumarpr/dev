var props = require('../js/emlr/props')


function getHighLevelProps(props, highLevelProps){
    for (let index = 0; index < 1; index++) {
        let currentItem = props[index];

        highLevelProps.push(currentItem.name);
        if (currentItem.hasOwnProperty("props")){
            getHighLevelProps(currentItem["props"], highLevelProps);
        }
    }
}

function getSimpleProps(props){
    let simpleProps = [];
    for (let i = 0; i < props.length; i++) {
        simpleProps.push(props[i].name);
    }

    return simpleProps;
}

function getFilteredProps(props, filter){
    if (filter[0].value == "*"){
        let values = []
        for (let i = 0; i < props.length; i++){
            if (props[i].name == filter[0].name){
                values.push(props[i].value);
            }
        }
        return values;
    }
    prop = null;
    for (let i = 0; i < props.length; i++){
        if (props[i].name == filter[0].name && props[i].value == filter[0].value){
            prop = props[i];
            break;
        }
    }
    if (prop != null) {
        return getFilteredProps(prop["props"], filter.slice(1));
    }
    return null;
}

let highLevelProps = [];
getHighLevelProps(props.__issues_props.props, highLevelProps)
console.log(highLevelProps);

let actionProps = [];
actionProps = getSimpleProps(props.__action_props.props)
console.log(actionProps);

highLevelProps = [];
getHighLevelProps(props.__channels_props.props, highLevelProps)
console.log(highLevelProps);

let filter = [
    {
        "name" : "Issue",
        "value" : "Asset Transcode Failed"
    },
    {
        "name" : "Action",
        "value" : "Delivered Program has failed to transcode. Please analyze and update Customer"
    },
    {
        "name" : "Actor",
        "value" : "*"
    }
];
let filteredProps = getFilteredProps(props.__issues_props.props, filter);
console.log(filteredProps);

let values = {
    "Customer" : "ACJ",
    "Channel" : "ABS",
    "Actor" : "Media"
}

for (value in values){
    console.log(value);
    console.log(values[value]);
}