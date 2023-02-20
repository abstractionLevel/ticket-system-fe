import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AddTask from '../component/formAddTask/addTask';
import Header from '../component/header/header';
import TaskCard from '../component/taskCard/taskCard';
import { getTasks } from '../service/taskService';
import { getProjects } from '../service/projectService';

const Home = (props) => {

    const [tasks, setTasks] = useState(null);
    const [projects, setProjects] = useState(null);
    const [showTask, setShowTask] = useState(true);
    const [addTask, setAddTask] = useState(false);
    const [deleteTask, setDeleteTask] = useState(false);
    const [status, setStatus] = useState('');
    const [projectStatus,setProjectStatus] = useState(null);

    useEffect(() => {
        getTasks()
            .then(tasks => setTasks(tasks))
            .catch(error => console.log(error));
        //prendo tutti i progetti dal db
        getProjects()
            .then(projects => setProjects(projects))
            .catch(error => console.log(error));
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
            <Header />
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
                    <div className="form-group">
                        <select className="form-control" id="status" value={projectStatus} onChange={(e) => setProjectStatus(e.target.value)} required>
                            {projects && projects.map(value => (
                                <option value={value.id}>Proggetto: {value.name}</option>
                            ))}

                        </select>
                    </div>
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
    return (
        <>
            <AddTask />
        </>
    )
}

function DeleteTaskComponent() {
    return <div>Componente per eliminare un task</div>;
}

export default Home;