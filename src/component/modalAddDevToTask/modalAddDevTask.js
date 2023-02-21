import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getDevs } from '../../service/employeeService';
import { assignTask } from '../../service/taskService';

const ModalAddDevTask = (props) => {

    const [show, setShow] = useState(false);
    const [devs , setDevs] = useState(null);
    const [devsStatus, setDevsStatus] = useState(null);


    const assign = () => {
        assignTask(props.taskId,devsStatus)
            .then(response=>console.log(response))
            .catch(error => console.log(error));
        props.close()
        window.location.reload(false);

    }

    useEffect(()=>{
        getDevs()
            .then(devs => {
                setDevs(devs)
                setDevsStatus(devs[0].id)
            })
            .catch(error => console.log(error));
    },[])

    return (
        <>
            <Modal show={props.open} onHide={props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <select className="form-control" id="status" value={devsStatus} onChange={(e) => setDevsStatus(e.target.value)} required>
                            {devs && devs.map(value => (
                                <option value={value.id}>DEV: {value.nome}</option>
                            ))}

                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={assign}>
                        Asssegna
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddDevTask;