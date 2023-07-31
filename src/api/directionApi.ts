import axios from 'axios';

export const directionApi = axios.create({
	baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
	params: {
		alternatives: false,
		geometries: 'geojson',
		overview: 'full',
		steps: 'false',
		access_token:
			'pk.eyJ1IjoiY3Jpc3RoaWFuMTYwMjAyIiwiYSI6ImNsNXBpZHFlNTBzdjczcXBucGUzN2ZxdjQifQ.bcGlzEVXl8ZT78pDRRwYqg',
	},
});
