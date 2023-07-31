import axios from 'axios';

export const searchApi = axios.create({
	baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
	params: {
		limit: 5,
		language: 'es',
		access_token:
			'pk.eyJ1IjoiY3Jpc3RoaWFuMTYwMjAyIiwiYSI6ImNsNXBpZHFlNTBzdjczcXBucGUzN2ZxdjQifQ.bcGlzEVXl8ZT78pDRRwYqg',
	},
});
