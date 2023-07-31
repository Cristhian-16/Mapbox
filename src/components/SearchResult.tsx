/* eslint-disable @typescript-eslint/no-floating-promises */
import { useContext, useState } from 'react';
import { MapContext, PlacesContext } from '../context';
import { LoadingPlaces } from '.';
import { Feature } from '../interfaces';

export const SearchResult = () => {
	const { places, isLoadingplaces, userLocation } = useContext(PlacesContext);
	const { map, getRouteDirections } = useContext(MapContext);
	const [active, setActive] = useState('');

	const onDirection = (place: Feature) => {
		const [lng, lat] = place.center;
		setActive(place.id);

		map?.flyTo({
			zoom: 15,
			center: [lng, lat],
		});
	};

	const getRouter = (place: Feature) => {
		if (!userLocation) return;

		const [lng, lat] = place.center;

		getRouteDirections(userLocation, [lng, lat]);
	};

	if (isLoadingplaces) {
		return <LoadingPlaces />;
	}

	if (places.length === 0) {
		return <></>;
	}

	return (
		<ul className={`list-group mt-3`}>
			{places.map((place) => (
				<li
					key={place.id}
					className={`${
						active === place.id ? 'active' : ''
					} list-group-item list-group-action`}
					style={{ cursor: 'pointer' }}
					onClick={() => onDirection(place)}
				>
					<h6>{place.text_es}</h6>
					<p style={{ fontSize: '12px' }}>{place.place_name_es}</p>

					<button
						onClick={() => getRouter(place)}
						className={`btn ${
							active === place.id ? 'btn-outline-light' : 'btn-outline-primary'
						} btn-sm`}
					>
						Trazar ruta
					</button>
				</li>
			))}
		</ul>
	);
};
