export const getUserLocation = async (): Promise<[number, number]> => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			/* Resolve */
			({ coords }) => {
				resolve([coords.longitude, coords.latitude]);
			},
			/* Reject */
			({ message }) => {
				reject(message);
			},
		);
	});
};
