/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import ReactDOM from 'react-dom/client';
import mapboxgl from 'mapbox-gl';

import { MapasApp } from './MapasApp';
import './index.css';

mapboxgl.accessToken =
	'pk.eyJ1IjoiY3Jpc3RoaWFuMTYwMjAyIiwiYSI6ImNsNXBpZHFlNTBzdjczcXBucGUzN2ZxdjQifQ.bcGlzEVXl8ZT78pDRRwYqg';

if (!navigator.geolocation) {
	alert('Tu navegador no tiene acceso a la ubicacion');
	throw new Error('Tu navegador no tiene acceso a la ubicacion');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MapasApp />
	</React.StrictMode>,
);
