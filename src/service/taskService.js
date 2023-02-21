import axios from "axios";

const BASE_URL = 'http://192.168.1.7:8080/api/projects/';
const BASE_URL_ASSIGN_PROJECT = 'http://192.168.1.7:8080/api/tasks/'

export const getTasksByProjectId = (id) =>
	axios.get(BASE_URL + id + "/tasks")
		.then(response => response.data)
		.catch(error => {
			console.log(error);
			return null;
		});


export const createTask = (id, payload) =>
	axios.post(BASE_URL + id + "/tasks", payload, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.data)
		.catch(error => {
			console.log(error);
			return null;
		});

export const assignTask = (id, devId) =>
	axios.post(BASE_URL_ASSIGN_PROJECT + id + "/assigned-developer?developerId=" + devId, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.data)
		.catch(error => {
			console.log(error);
			return null;
		});

export const getAssignedTasks = (id) =>
	axios.get(BASE_URL_ASSIGN_PROJECT + id + "/assigned-developer")
		.then(response => response.data)
		.catch(error => {
			console.log(error);
			return null;
		});


export const deleteAssignedTask = (taskId, assigneId) =>
	axios.delete(BASE_URL_ASSIGN_PROJECT + taskId + "/assigned-developer/" + assigneId)
		.then(response => response.data)
		.catch(error => {
			console.log(error);
			return null;
		});

export const getTasksByStatus = (status) =>
	axios.get(BASE_URL_ASSIGN_PROJECT + status)
		.then(response => response.data)
		.catch(error => {
			console.log(error);
			return null;
		});