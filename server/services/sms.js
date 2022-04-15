// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set region
AWS.config.update({ region: 'us-east-1' });

//take in number variable here when in production
function sendSms(url) {
    // Create publish parameters
    var params = {
        Message: 'ec2-54-159-244-208.compute-1.sns.amazonaws.com/url/individual/' + '' + url, /* required */
        PhoneNumber: '+353896154318',
    };

    // Create promise and SNS service object
    var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

    // Handle promise's fulfilled/rejected states
    publishTextPromise.then(
        function (data) {
            console.log("MessageID is " + data.MessageId);
        }).catch(
            function (err) {
                console.error(err, err.stack);
            });

    console.log(params.Message);
}

module.exports = {
    sendSms
}