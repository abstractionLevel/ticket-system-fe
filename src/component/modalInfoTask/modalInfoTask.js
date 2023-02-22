import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { addNote, deleteAssignedTask, getNotes } from '../../service/taskService';
import { getAssignedTasks } from '../../service/taskService';
import { getEmployeeById } from '../../service/employeeService';
import { Card } from 'react-bootstrap';


const ModalInfoTask = (props) => {

    const [description, setDescription] = useState(null);
    const [taskId, setTaskId] = useState(props.taskId);
    const [devId, setDevId] = useState(null);
    const [devs, setDevs] = useState([]);
    const [notes, setNotes] = useState();



    const removeDevFromTask = (dev) => {
        console.log(dev)
        deleteAssignedTask(taskId,dev.id)//cancello  il dev assegnato al task
            .then(response => {
                setDevs([]);
                getAssignedTasks(props.taskId)//rifaccio la chiamata per popolare i devs assegnati al task
                    .then(response => {
                        if (response) {
                            // per ogni id del dev assegnato faccio una chiamata per prendere le sue info
                            response.map(val => {
                                getEmployeeById(val.devId)
                                    .then(res => {
                                        // pusho il dev nella lista
                                        setDevs(prevDevs => [...prevDevs, res]);
                                    })
                            })
                        }
                    })
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (taskId && description && devId) {
            const pyload = {
                "developerId": devId,
                "taskId": taskId,
                "descrizione": description,
            }
            addNote(taskId, pyload)
                .then(response => {
                    setDescription('');
                    getNotes(props.taskId)//prendo le notes del task
                        .then(response => setNotes(response))
                })
        }
    }

    useEffect(() => {
        //prendo i records dei tasks assegnati , e, 
        if (props.open) {
            getAssignedTasks(props.taskId)
                .then(response => {
                    if (response) {
                        // per ogni id del dev assegnato faccio una chiamata per prendere le sue info
                        response.map(val => {
                            getEmployeeById(val.devId)
                                .then(res => {
                                    // pusho il dev nella lista
                                    setDevs(prevDevs => [...prevDevs, res]);
                                })
                        })
                    }
                })
            getNotes(props.taskId)//prendo le notes del task
                .then(response => setNotes(response))
        } else if (!props.open) {
            setNotes(null);
            setDevs([]);
        }



    }, [props.open])
    return (
        <>
            <Modal show={props.open} onHide={props.close} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>INFO TASK</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                Developers
                                <ListGroup>
                                    {devs.map(dev => (
                                        <ListGroup.Item key={dev.id} className='mt-2'>
                                            {dev.nome} - {dev.cognome} <br />
                                            team: {dev.teamName}
                                            <Button size="sm" style={{ float: 'right' }}  onClick={() => removeDevFromTask(dev)}>Rimuovi</Button>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>
                            <Col>
                                Commenti
                                <Col >
                                    <div className="overflow-auto" style={{ height: '400px' }}>
                                        {notes && notes.map(val => (
                                            <Card style={{ marginTop: '10px', position: 'relative' }}>
                                                <Card.Body>
                                                    <Card.Body style={{ padding: '10px' }}>
                                                        {val.cognome}<br />
                                                        Note: {val.descrizione}
                                                    </Card.Body>
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                </Col>
                                <Col>
                                    <form onSubmit={handleSubmit} className="mt-5">
                                        <div className="form-group">
                                            <label htmlFor="description">Aggiunti nota</label>
                                            <input type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                                        </div>
                                        <div className="form-group mt-3">
                                            <select className="form-control" id="status" value={devId} onChange={(e) => setDevId(e.target.value)} required>
                                                <option value={null}>scegli un dev</option>
                                                {devs && devs.map(value => (
                                                    <option value={value.id}>{value.nome}</option>
                                                ))}

                                            </select>
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-4">Invia</button>
                                    </form>
                                </Col>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalInfoTask;