import { useContext } from 'react';
import { MapContext, PlacesContext } from '../context';

export const BtnMyLocation = () => {
	const { map, isMapReady } = useContext(MapContext);
	const { userLocation } = useContext(PlacesContext);

	const myUbication = () => {
		if (!isMapReady) {
			throw new Error('El mapa no esta listo');
		}
		if (!userLocation) {
			throw new Error('Tu ubicacion no es accesible');
		}

		map?.flyTo({
			center: userLocation,
			zoom: 15,
		});
	};

	return (
		<button
			onClick={myUbication}
			className='btn btn-danger'
			style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 999 }}
		>
			{' '}
			Mi ubicacion{' '}
		</button>
	);
};
