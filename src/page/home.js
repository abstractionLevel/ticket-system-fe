import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import AddTask from '../component/formAddTask/addTask';
import Header from '../component/header/header';
import TaskCard from '../component/taskCard/taskCard';
import { getTasksByProjectId, getTasksByStatus } from '../service/taskService';
import { getProjects } from '../service/projectService';
import ProjectCard from '../component/projectCard/projectCard';
import AddEmployee from '../component/addEmployee/addEmployee';

const Home = (props) => {

    const [tasks, setTasks] = useState(null);
    const [projects, setProjects] = useState(null);
    const [showTask, setShowTask] = useState(true);
    const [addTask, setAddTask] = useState(false);
    const [showProject, setShowProject] = useState(false);
    const [projectStatus, setProjectStatus] = useState(null);
    const [showEmployee, setShowEmployee] = useState(null);

    useEffect(() => {
        //prendo tutti i progetti dal db
        getProjects()
            .then(projects => {
                setProjects(projects)
                setProjectStatus(projects[0].id)
            })
            .catch(error => console.log(error));

    }, [])

    useEffect(() => {
        getTasksByProjectId(projectStatus)
            .then(tasks => setTasks(tasks))
            .catch(error => console.log(error));
    }, [projectStatus])


    const handleOptionClick = (option) => {
        setShowTask(false);
        setAddTask(false);
        setShowProject(false);

        if (option === 'show') setShowTask(true);
        if (option === 'add') setAddTask(true);
        if (option === 'project') setShowProject(true);
        if (option === 'showEmployee') setShowEmployee(true);
    };

    const getAllTask = () => {
        getTasksByProjectId(projectStatus)
            .then(tasks => setTasks(tasks))
            .catch(error => console.log(error));
    }

    const  isDateAfterToday = (date) => {
        const today = new Date(); 
        const inputDate = new Date(date);
        return inputDate < today;
      }

    const getTaskOverDeadLine = () => {
        getTasksByProjectId(projectStatus)
            .then(tasks => {
                const newTasks = tasks.filter(val=>isDateAfterToday(val.deadline))//prendo solo quello che sono scaduti
                setTasks(newTasks)
            })
            .catch(error => console.log(error));
    }

    const getTaskByElaborazione = () => {
        getTasksByStatus("elaborazione")
            .then(response => setTasks(response))
    }

    return (
        <Container >
            <Header />
            <Row>
                <Col md={3}>
                    <ListGroup as="ul">
                        <ListGroup.Item as="li" active={showTask} onClick={() => handleOptionClick('show')}>
                            Mostra task
                        </ListGroup.Item>
                        <ListGroup.Item as="li" active={addTask} onClick={() => handleOptionClick('add')}>
                            Aggiungi task
                        </ListGroup.Item>
                        <ListGroup.Item as="li" active={showProject} onClick={() => handleOptionClick('project')}>
                            Projects
                        </ListGroup.Item>
                        <ListGroup.Item as="li" active={showEmployee} onClick={() => handleOptionClick('showEmployee')}>
                            Employee
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={9}>
                    <div className="form-group mb-2">
                        <select className="form-control" id="status" value={projectStatus} onChange={(e) => setProjectStatus(e.target.value)} required>
                            {projects && projects.map(value => (
                                <option value={value.id}>Proggetto: {value.name}</option>
                            ))}

                        </select>
                    </div>
                    <Row>
                        <Col>
                            <Button className="btn btn-info btn-sm " onClick={getAllTask}>
                                Tutti
                            </Button>
                            <Button className="btn btn-info btn-sm " style={{ marginLeft: '10px' }} onClick={getTaskByElaborazione}>
                                Elaborazione
                            </Button>
                            <Button className="btn btn-info btn-sm " style={{ marginLeft: '10px' }} onClick={getTaskOverDeadLine}>
                                sforato la deadline
                            </Button>
                        </Col>
                    </Row>

                    {showTask && <ShowTaskComponent tasks={tasks} />}
                    {addTask && <AddTaskComponent projectId={projectStatus} />}
                    {showProject && <ShowProject projects={projects} />}
                    {showEmployee && <ShowEmployee />}

                </Col>
            </Row>
        </Container >
    )
}
function ShowTaskComponent(props) {
    return (
        <>
            {props.tasks && props.tasks.map((value, index) => (
                <TaskCard description={value.descrizione} status={value.status} deadline={value.deadline} id={value.id} />
            ))}
        </>
    )
}

function AddTaskComponent(props) {
    return (
        <>
            <AddTask projectId={props.projectId} />
        </>
    )
}

const ShowProject = (props) => {
    return (
        <>
            {props.projects && props.projects.map((value, index) => (
                <ProjectCard project={value} />
            ))}

        </>
    )
}

const ShowEmployee = (props) => {
    return (
        <>
            <AddEmployee />

        </>
    )
}



export default Home;