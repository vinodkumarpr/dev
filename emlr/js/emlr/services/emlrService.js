(function (app) {

    var emlrService = function ($http) {
        var emlrFactory = {};
        var config_name = config['active_config'];

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

        function getSimplePropOptions(props, prop){
            let foundProp = null;
            for (let i = 0; i < props.length; i++) {
                if (props[i].name == prop) {
                    foundProp = props[i];
                    break;
                }
            }
            if (foundProp){
                let options = [];
                for (let i = 0; i < foundProp.props.length; i++) {
                    options.push(foundProp.props[i].name);
                }

                return options;
            }
            return null;
        }

        function getFilteredPropOptions(props, filter){
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
                return getFilteredPropOptions(prop["props"], filter.slice(1));
            }
            return null;
        }

        var actionPromise = new Promise((resolve, reject)=>{
            getS3Object(getS3(config[config_name]), config[config_name]["bucket"], config[config_name]["path"]["action"], (err, data) => {
                if (!err) {
                    let text = data.Body.toString('utf-8');
                    preparePropertiesFromString(text, false, (props) => {
                        __action_props = JSON.parse(props);
                        resolve();                        
                    })                    
                } else {
                    console.log("Could not load recipients list from S3");
                    reject();
                }
            });
        });

        emlrFactory.init = function (callback) {
            actionPromise.then(function(result) {                 
                console.log("actionPromise:: success")
            }).catch(function() {
                console.log("actionPromise:: error")
            }).finally(function() {
                console.log("actionPromise:: completed")
                callback();
            });            
        };

        emlrFactory.getIssues = function() {
            let props = [];
            getHighLevelProps(__issues_props.props, props);
            return props;
        }

        emlrFactory.getChannels = function() {
            let props = [];
            getHighLevelProps(__channels_props.props, props);
            return props;
        }

        emlrFactory.getAction = function() {
            let props = getSimpleProps(__action_props.props);
            return props;
        }

        emlrFactory.getIssueOptions = function(filter){
            return getFilteredPropOptions(__issues_props.props, filter);
        }

        emlrFactory.getChannelOptions = function(filter){
            return getFilteredPropOptions(__channels_props.props, filter);
        }

        emlrFactory.getActionOptions = function(prop){
            return getSimplePropOptions(__action_props.props, prop);
        }
        return emlrFactory;
    };
    app.factory("emlrService", emlrService);
}(angular.module("emlrApp")));