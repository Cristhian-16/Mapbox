/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-mixed-spaces-and-tabs */

import { Feature } from '../../interfaces';
import { PlacesState } from './Places';

type PlacesAction =
	| {
			type: 'setUserLocation';
			payload: [number, number];
	  }
	| {
			type: 'setPlaces';
			payload: Feature[];
	  }
	| { type: 'setLoadingPlaces' };

export const placesReducer = (state: PlacesState, action: PlacesAction) => {
	switch (action.type) {
		case 'setUserLocation':
			return {
				...state,
				isLoading: false,
				userLocation: action.payload,
			};
		case 'setLoadingPlaces':
			return {
				...state,
				isLoadingplaces: true,
				places: [],
			};
		case 'setPlaces':
			return {
				...state,
				isLoadingplaces: false,
				places: action.payload,
			};
		default:
			return state;
	}
};
