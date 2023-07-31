/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useLayoutEffect, useRef } from 'react';
import { MapContext, PlacesContext } from '../context';
import { Loading } from '.';
import { Map } from 'mapbox-gl';

export const MapView = () => {
	const refDiv = useRef<HTMLDivElement>(null);
	const { isLoading, userLocation } = useContext(PlacesContext);
	const { setMap } = useContext(MapContext);

	useLayoutEffect(() => {
		if (!isLoading) {
			const map = new Map({
				container: refDiv.current!,
				style: 'mapbox://styles/mapbox/streets-v12',
				center: userLocation,
				zoom: 14,
			});
			setMap(map);
		}
	}, [isLoading]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div
			ref={refDiv}
			style={{
				width: '100vw',
				height: '100vh',
				position: 'fixed',
				top: 0,
				left: 0,
			}}
		></div>
	);
};
