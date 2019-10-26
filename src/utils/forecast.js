const request = require('request')


const forecast = (latitude, longitude, callback) => {
    // console.log(location);

    const url = 'https://api.darksky.net/forecast/08896164c746f8de8d84e84e4def24b0/' + latitude + ',' + longitude + '?units=si'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            return console.log('Unable to connect weather service', undefined);
        }
        else if (body.error) {
            return console.log(body.error, undefined);
        }
        else {
            callback(undefined, body.daily.data[0].summary + ' It is ' + body.currently.temperature + ' outside and has ' + body.currently.precipProbability + '% of rain.');
        }
    })
}

module.exports = forecast