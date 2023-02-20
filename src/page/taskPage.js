import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TaskCard from '../component/taskCard/taskCard';
import { getTasks } from '../service/taskService';

const TaskPage = (props) => {

    const [tasks, setTasks] = useState(null);
    const [showTask, setShowTask] = useState(false);
    const [addTask, setAddTask] = useState(false);
    const [deleteTask, setDeleteTask] = useState(false);

    useEffect(() => {
        getTasks()
            .then(tasks => setTasks(tasks))
            .catch(error => console.log(error))
    }, [])

    const handleOptionClick = (option) => {
        setShowTask(false);
        setAddTask(false);
        setDeleteTask(false);

        if (option === 'show') setShowTask(true);
        if (option === 'add') setAddTask(true);
        if (option === 'delete') setDeleteTask(true);
    };
    return (
        <Container >

            <Row>
                <Col md={3}>
                    <div className="menu">
                        <div className="option" onClick={() => handleOptionClick('show')}>
                            Mostra task
                        </div>
                        <div className="option" onClick={() => handleOptionClick('add')}>
                            Aggiungi task
                        </div>
                        <div className="option" onClick={() => handleOptionClick('delete')}>
                            Elimina task
                        </div>
                    </div>
                </Col>
                <Col md={9}>
                    {showTask && <ShowTaskComponent tasks={tasks} />}
                    {addTask && <AddTaskComponent />}
                    {deleteTask && <DeleteTaskComponent />}
                </Col>
            </Row>
        </Container >
    )
}
function ShowTaskComponent(props) {
    return (
        <>
            {props.tasks && props.tasks.map((value, index) => (
                <TaskCard description={value.descrizione} status={value.status} deadline={value.deadline} />
            ))}
        </>
    )
}

function AddTaskComponent() {
    return <div>Componente per aggiungere un task</div>;
}

function DeleteTaskComponent() {
    return <div>Componente per eliminare un task</div>;
}

export default TaskPage;