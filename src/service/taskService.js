import axios from "axios";

const BASE_URL = 'http://192.168.1.7:8080/api/projects/';
const BASE_URL_TASK = 'http://192.168.1.7:8080/api/tasks/'

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
	axios.post(BASE_URL_TASK + id + "/assigned-developer?developerId=" + devId, {
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
	axios.get(BASE_URL_TASK + id + "/assigned-developer")
		.then(response => response.data)
		.catch(error => {
			console.log(error);
			return null;
		});


export const deleteAssignedTask = (taskId, devId) =>
	axios.delete(BASE_URL_TASK + taskId + "/assigned-developer/" + devId)
		.then(response => response.data)
		.catch(error => {
			console.log(error);
			return null;
		});

export const getTasksByStatus = (status,projectId) =>
	axios.get(BASE_URL_TASK + status +  "/projects/" + projectId)
		.then(response => response.data)
		.catch(error => {
			console.log(error);
			return null;
		});

export const addNote = (taskId, payload) =>
	axios.post(BASE_URL_TASK + taskId + '/notes', payload)
		.then(response => response.data)
		.catch(error => {
			console.log(error);
			return null;
		});
export const getNotes = (taskId) =>
	axios.get(BASE_URL_TASK + taskId+'/notes')
		.then(response => response.data)
		.catch(error => {
			console.log(error);
			return null;
		});