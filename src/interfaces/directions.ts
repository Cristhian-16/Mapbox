/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DirecctionInterface {
	routes: Route[];
	waypoints: Waypoint[];
	code: string;
	uuid: string;
}

export interface Route {
	weight_name: string;
	weight: number;
	duration: number;
	distance: number;
	legs: Leg[];
	geometry: GeometryDirection;
}

export interface GeometryDirection {
	coordinates: Array<number[]>;
	type: string;
}

export interface Leg {
	notifications: Notification[];
	via_waypoints: any[];
	admins: Admin[];
	weight: number;
	duration: number;
	steps: any[];
	distance: number;
	summary: string;
}

export interface Admin {
	iso_3166_1_alpha3: string;
	iso_3166_1: string;
}

export interface Notification {
	details: Details;
	subtype: string;
	type: string;
	geometry_index_end: number;
	geometry_index_start: number;
}

export interface Details {
	message: string;
}

export interface Waypoint {
	distance: number;
	name: string;
	location: number[];
}
