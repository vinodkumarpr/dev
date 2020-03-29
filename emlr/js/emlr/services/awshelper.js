var s3;

function getS3(config) {
    if (s3) {
        return s3;
    }
    // import individual service
    AWS.config.update(config);
    s3 = new AWS.S3();
    return s3;
}



//getS3(amg_def_config).listBuckets(function(err, data) { console.log(err, data); });

function listS3Objects(s3, bucket, prefix, callback){
    var params = {
        Bucket: bucket,
    };
    if (prefix){
        params["Prefix"] = prefix;
    }
    let objects = [];
    listObjectsRecursive(s3, params, objects, callback);
}

function listObjectsRecursive(s3, params, objects, callback) {
    s3.listObjectsV2(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            callback(err, null);
        }
        else {
            for (let i = 0; i < data.Contents.length; i++) {
                objects.push(data.Contents[i]);
            }
            if (data.IsTruncated) {
                params["ContinuationToken"] = data.NextContinuationToken;
                listObjectsRecursive(s3, params, objects, callback);
            } else {
                callback(0, objects);
            }
        }
    });
}

function putS3Object(s3, filename, bucket, key, callback) {
    let stream = require('fs').createReadStream(filename);

    var params = {
        Body: stream,
        Bucket: bucket,
        Key: key
    };
    s3.putObject(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            console.log(data);           // successful response
        }
        callback(err, data);
    });
}

function getS3Object(s3, bucket, key, callback) {
    var params = {
        Bucket: bucket,
        Key: key
    };

    s3.getObject(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            //console.log(err, data);
        }
        callback(err, data);
    });
}

