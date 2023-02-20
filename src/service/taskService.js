import axios from "axios";

const BASE_URL = 'http://192.168.1.7:8080/api/projects/';

export const getTasksByProjectId = (id) =>
    axios.get(BASE_URL+id+"/tasks")
        .then(response => response.data)
        .catch(error => {
            console.log(error);
            return null;
        });

