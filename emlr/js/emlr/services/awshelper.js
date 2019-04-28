var s3;

function getS3(config) {
    if (s3) {
        return s3;
    }
    AWS.config.update(config);
    s3 = new AWS.S3();
    return s3;
}

