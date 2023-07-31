/* eslint-disable @typescript-eslint/no-floating-promises */
import { useRef, ChangeEvent, useContext } from 'react';
import { PlacesContext } from '../context';
import { SearchResult } from '.';

export const Search = () => {
	const { searchPlacesByText } = useContext(PlacesContext);
	const refDebounce = useRef<NodeJS.Timeout>();

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (refDebounce.current) {
			clearTimeout(+refDebounce.current);
		}
		refDebounce.current = setTimeout(() => {
			searchPlacesByText(event.target.value);
		}, 1000);
	};

	return (
		<div
			style={{
				position: 'fixed',
				top: '20px',
				left: '20px',
				backgroundColor: 'white',
				zIndex: 980,
				boxShadow: '0 5px 10px rgba(0,0,0,0,2)',
				padding: '5px',
				borderRadius: '5px',
				width: '250px',
			}}
		>
			<input
				type='text'
				placeholder='Buscar una direccion'
				className='form-control'
				onChange={handleChange}
			/>
			<SearchResult />
		</div>
	);
};
