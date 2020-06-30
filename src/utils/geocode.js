const request = require('postman-request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
        encodeURIComponent(address) + 
        '.json?access_token=pk.eyJ1IjoicmUtYi1lbCIsImEiOiJja2JveW5raGQwNGg1MnltcDFsbnVxdTd2In0.vZM2FyRiTWBi3ebQkyfirw&limit=1';
    
    request( {
        url,
        json: true
    }, 
    (error, {body}) => {
        if (error) {
            callback('Unable to connect to geolocation services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {

            const lat = body.features[0].geometry.coordinates[1];
            const long = body.features[0].geometry.coordinates[0];

            callback(undefined, {
                latitude: lat,
                longitude: long,
                placeName: body.features[0].place_name
            })

        }
    }

    )    


}

module.exports = geoCode