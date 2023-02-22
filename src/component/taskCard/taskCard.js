import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { deleteAssignedTask, getAssignedTasks } from '../../service/taskService';
import ModalAddDevTask from '../modalAddDevToTask/modalAddDevTask';
import './taskCard.scss';
import { getEmployeeById } from '../../service/employeeService';
import ModalInfoTask from '../modalInfoTask/modalInfoTask';

const TaskCard = ({ description, status, deadline, id }) => {

    const [showModalAddDev, setShowModalAddDev] = useState(false);
    const [showModalInfoTask, setShowModalInfoTask] = useState(false);
    const [tasksAssgnment, setTaskAssignments] = useState(null);
    const [dev, setDev] = useState(null);
    const [assignedId, setAssignedId] = useState(null);

    useEffect(() => {
        getAssignedTasks(id)
            .then(response => setTaskAssignments(response))
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        if (tasksAssgnment) {
            tasksAssgnment.map(val => {
                if (val.taskId === id) {
                    setAssignedId(val.id)
                    getEmployeeById(val.devId)
                        .then(response => setDev(response))
                        .catch(error => console.log(error))
                }
            })
        }
    }, [tasksAssgnment])


    const removeAssigned = () => {
         deleteAssignedTask(id,assignedId)
         window.location.reload(false);

    }


    return (
        <>
            <Card style={{ marginTop: '10px', position: 'relative' }}>
                <Card.Body>
                    <Card.Body>
                        <Card.Title>{description}</Card.Title>
                        <Card.Text>Status: {status}</Card.Text>
                        <Card.Text>Deadline: {deadline}</Card.Text>
                    </Card.Body>
                    <Card.Footer >
                        <Button style={{ float: 'right' , marginLeft: '10px' }} onClick={() => setShowModalAddDev(!showModalAddDev)} variant="primary" size="sm">Assegna ad un dev</Button> 
                        <Button style={{ float: 'right' }} onClick={() => setShowModalInfoTask(!showModalInfoTask)} variant="primary" size="sm">Info</Button>
                    </Card.Footer>
                </Card.Body>
            </Card>
            <ModalAddDevTask close={() => setShowModalAddDev(!showModalAddDev)} open={showModalAddDev} taskId={id} />
            <ModalInfoTask close={() => setShowModalInfoTask(!showModalInfoTask)} open={showModalInfoTask} taskId={id} />

        </>
    )
}

export default TaskCard;