import axios from "axios";

const BASE_URL = 'http://192.168.1.7:8080/api/employees';

export const getEmployees = () =>
    axios.get(BASE_URL)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
            return null;
        });

export const getPms = () =>
    axios.get(BASE_URL + "/role/pms")
        .then(response => response.data)
        .catch(error => {
            console.log(error);
            return null;
        });

export const getDevs = () =>
    axios.get(BASE_URL + "/role/devs")
        .then(response => response.data)
        .catch(error => {
            console.log(error);
            return null;
        });

export const getEmployeeById = (id) =>
    axios.get(BASE_URL +'/'+ id)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
            return null;
        });
