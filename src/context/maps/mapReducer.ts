/* eslint-disable no-mixed-spaces-and-tabs */

import { Map, Marker } from 'mapbox-gl';
import { MapsState } from '.';

type MapAction =
	| {
			type: 'setMap';
			payload: Map;
	  }
	| { type: 'setMarkers'; payload: Marker[] };

export const mapReducer = (state: MapsState, action: MapAction) => {
	switch (action.type) {
		case 'setMap':
			return {
				...state,
				isMapReady: true,
				map: action.payload,
			};
		case 'setMarkers':
			return {
				...state,
				markers: action.payload,
			};
		default:
			return state;
	}
};
