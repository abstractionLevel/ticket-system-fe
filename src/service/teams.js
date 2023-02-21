import axios from "axios";

const BASE_URL = 'http://192.168.1.7:8080/api/teams';

export const getAllRole = () =>
	axios.get(BASE_URL)
		.then(response => response.data)
		.catch(error => {
			console.log(error);
			return null;
		});