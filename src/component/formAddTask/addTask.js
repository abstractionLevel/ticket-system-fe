import React, { useEffect, useState } from 'react';
import { getEmployees } from '../../service/employeeService';
import { createTask } from '../../service/taskService';

const AddTask = (props) => {

    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [deadline, setDeadline] = useState(null);
    const [employess, setEmployees] = useState(null);
    const [statusEmployee, setStatusEmployee] = useState(null);

    useEffect(() => {
        getEmployees()
            .then(response => {setEmployees(response)})
            .catch(error => console.log(error))
    },[])

    useEffect(() => {
        if(employess) {
            setStatusEmployee(employess[0].id)

        }
    },[employess])

    const handleSubmit = (event) => { 
        event.preventDefault();
        const pyload = {
            "descrizione": description,
            "status": status,
            "deadline": deadline,
            "pmId":statusEmployee
        }
        createTask(props.projectId,pyload)
            .then(response => console.log(response.data))
            .catch(error => {
                console.log(error);
                return null;
            });
        
       
    }

    return (
        <form onSubmit={handleSubmit} className="mt-5">
            <div className="form-group">
                <label htmlFor="description">Descrizione</label>
                <input type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="status">Stato</label>
                <select className="form-control" id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option value="">Seleziona uno stato</option>
                    <option value="todo">Da fare</option>
                    <option value="in-progress">In corso</option>
                    <option value="done">Completato</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="deadline">Scadenza</label>
                <input type="date" className="form-control" id="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="status">Assegna ad un Pm</label>
                <select className="form-control" id="status" value={statusEmployee} onChange={(e) => setStatusEmployee(e.target.value)} required>
                    {employess && employess.map(value => (
                        <option value={value.id}>{value.nome}</option>

                    ))}

                </select>
            </div>
            <button type="submit" className="btn btn-primary mt-4">Aggiungi Task</button>
        </form>
    )
}

export default AddTask;