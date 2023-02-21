import axios from "axios";



const BASE_URL = 'http://192.168.1.7:8080/api/projects';

export const getProjects = () =>
    axios.get(BASE_URL)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
            return null;
        });
export const getAssignedProjects = (id) =>
    axios.get(BASE_URL+'/'+id+'/teams')
        .then(response => response.data)
        .catch(error => {
            console.log(error);
            return null;
        });
