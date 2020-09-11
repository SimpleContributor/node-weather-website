const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2ltcGxlY29udHJpYnV0b3IiLCJhIjoiY2tlcTJ1aGQ1MGhkYTJ3dDhncWZwZ21sZCJ9.NRXZMLGR226kVukxtzxJFA'

    request({ url, json: true }, (err, { body }) => {
        if(err) {
            callback('Unable to connect to location services!', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode;
