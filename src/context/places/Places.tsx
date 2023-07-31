import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { placesReducer } from './placesReducer';
import { getUserLocation } from '../../helpers';
import { searchApi } from '../../api';
import { Feature, GeoMapInterface } from '../../interfaces';

export interface PlacesContextProps {
	isLoading: boolean;
	userLocation?: [number, number];
	places: Feature[];
	isLoadingplaces: boolean;
	searchPlacesByText: (query: string) => Promise<Feature[]>;
}

export interface PlacesState {
	isLoading: boolean;
	userLocation?: [number, number]; // [lng,lat] => longitud , latitud
	isLoadingplaces: boolean;
	places: Feature[];
}

const INITIAL_STATE: PlacesState = {
	isLoading: true,
	userLocation: undefined,
	isLoadingplaces: false,
	places: [],
};

export const PlacesContext = createContext({} as PlacesContextProps);
const { Provider } = PlacesContext;

export const Places = ({ children }: { children?: ReactNode }) => {
	const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

	useEffect(() => {
		getUserLocation()
			.then((lngLat) => dispatch({ type: 'setUserLocation', payload: lngLat }))
			.catch((error) => console.log(error));
	}, []);

	const searchPlacesByText = async (query: string): Promise<Feature[]> => {
		if (query.length === 0) {
			dispatch({ type: 'setPlaces', payload: [] });
			return [];
		}
		if (!state.userLocation) throw new Error('Error');

		dispatch({ type: 'setLoadingPlaces' });

		const { data } = await searchApi.get<GeoMapInterface>(`/${query}.json`, {
			params: {
				proximity: state.userLocation.join(','),
			},
		});
		dispatch({ type: 'setPlaces', payload: data.features });
		return data.features;
	};

	return (
		<Provider
			value={{
				...state,
				searchPlacesByText,
			}}
		>
			{children}
		</Provider>
	);
};
