import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { getEmployees, getPms } from '../../service/employeeService';


const EmployeeCard = (props) => {

    const [employees, setEmployees] = useState([]);



    useEffect(() => {
        getEmployees()//prendo tutti gli employees
            .then(response => {
                if (response) {
                    let employees = []
                    response.map(employee => {//itero il response
                        getPms()//prendo i pm
                            .then(pm => {
                                pm.map(va => {
                                    if (va.id === employee.referentId) {//controllo il referento e creo un oggetto employee
                                        setEmployees(prevDevs => [...prevDevs, { nome: employee.nome, cognome: employee.cognome, referente: va.nome }]);
                                    }
                                })

                            })
                    })
                }
            })
    }, [])

    useEffect(() => {

    }, [])


    return (
        <>
            {employees && employees.map(employee => (
                <Card style={{ marginTop: '4px', position: 'relative', padding:0 }}>
                    <Card.Body style={{  padding:'5px' }}>
                        <Card.Body>
                            <Card.Title>Employee: {employee.nome} {employee.cognome}</Card.Title>
                            <Card.Text>Referent: {employee.referente}</Card.Text>
                        </Card.Body>
                    </Card.Body>
                </Card>
                
            ))}

        </>
    )
}

export default EmployeeCard;