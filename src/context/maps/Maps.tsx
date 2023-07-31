/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useReducer,
} from 'react';

import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';

import { mapReducer } from '.';
import { PlacesContext } from '..';
import { directionApi } from '../../api/directionApi';
import { DirecctionInterface } from '../../interfaces';

interface MapContextProps {
	isMapReady: boolean;
	map?: Map;
	setMap: (map: Map) => void;
	getRouteDirections: (
		start: [number, number],
		end: [number, number],
	) => Promise<void>;
}

export interface MapsState {
	isMapReady: boolean;
	map?: Map;
	markers: Marker[];
}

const INITIAL_STATE: MapsState = {
	isMapReady: false,
	map: undefined,
	markers: [],
};

export const MapContext = createContext({} as MapContextProps);
const { Provider } = MapContext;

export const Maps = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
	const { places } = useContext(PlacesContext);

	useEffect(() => {
		/* Cambio de lugares */
		state.markers.forEach((marker) => marker.remove());

		const newMarkers: Marker[] = [];

		for (const place of places) {
			const [lng, lat] = place.center;
			const popup = new Popup().setHTML(`
      <h6>${place.text_es}</>h6
      <p>${place.place_name_es}</p>`);

			const newMarker = new Marker()
				.setPopup(popup)
				.setLngLat([lng, lat])
				.addTo(state.map!);

			newMarkers.push(newMarker);
		}
		/* Eliminar los markers anteriores */
		dispatch({ type: 'setMarkers', payload: newMarkers });
	}, [places]);

	useEffect(() => {
		if (state.map?.getLayer('RouteString') && !places.length) {
			state.map.removeLayer('RouteString');
			state.map.removeSource('RouteString');
		}
	}, [places]);

	const setMap = (map: Map) => {
		/* Popup */
		const myLocationPopup = new Popup().setHTML(`
    <h4>Aqui Estoy</h4>
    <p>En algun lugar</p>  
    `);

		/* Marcador */
		new Marker({ color: '#61DAFB' })
			.setLngLat(map.getCenter())
			.addTo(map)
			.setPopup(myLocationPopup);

		dispatch({ type: 'setMap', payload: map });
	};

	const getRouteDirections = async (
		start: [number, number],
		end: [number, number],
	) => {
		try {
			const { data } = await directionApi.get<DirecctionInterface>(
				`/${start.join(',')};${end.join(',')}`,
			);

			const { distance, geometry } = data.routes[0];
			const { coordinates } = geometry;

			let kms = distance / 1000;
			kms = Math.round(kms * 100);
			kms /= 100;

			const bounds = new LngLatBounds(start, start);

			for (const coords of coordinates) {
				const newCord: [number, number] = [coords[0], coords[1]];
				bounds.extend(newCord);
			}

			state.map?.fitBounds(bounds, { padding: 200 });

			/* Polilyne */
			const sourceData: AnySourceData = {
				type: 'geojson',
				data: {
					type: 'FeatureCollection',
					features: [
						{
							type: 'Feature',
							properties: {},
							geometry: {
								type: 'LineString',
								coordinates,
							},
						},
					],
				},
			};

			if (state.map?.getLayer('RouteString')) {
				state.map.removeLayer('RouteString');
				state.map.removeSource('RouteString');
			}

			state.map?.addSource('RouteString', sourceData);
			state.map?.addLayer({
				id: 'RouteString',
				type: 'line',
				source: 'RouteString',
				layout: {
					'line-cap': 'round',
					'line-join': 'round',
				},
				paint: {
					'line-color': 'black',
					'line-width': 3,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Provider
			value={{
				...state,
				setMap,
				getRouteDirections,
			}}
		>
			{children}
		</Provider>
	);
};
