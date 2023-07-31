import { Maps, Places } from './context';
import { HomeScreen } from './screens';

export const MapasApp = () => {
	return (
		<Places>
			<Maps>
				<HomeScreen />
			</Maps>
		</Places>
	);
};
