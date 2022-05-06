import axios from 'axios';
import 'dotenv/config';

import HttpError from '../models/http-error.js';

const API_KEY = process.env.MAPBOX_API_KEY;
const API_LINK = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
const PARAM = '&autocomplete=true&fuzzyMatch=false';

const getCoordsForAddress = async (address) => {
    const searchText = encodeURIComponent(address);
    const urlForGeoCode = `${API_LINK}/${searchText}.json?access_token=${API_KEY}${PARAM}`;
 
    const response = await axios.get(urlForGeoCode);

    if (!response.data.features.length) {
        throw new HttpError('Coud not find location for the specified address!', 422);
    }
 
    const coordintes = response.data.features[0].center;

    return {
        lat: coordintes[1],
        long: coordintes[0]
      };
}

export default getCoordsForAddress;