import React , {useState} from 'react';

const AddTask = () => {

    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleOptionClick = () => {}

    const handleSubmit = () => {}

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary mt-2">Aggiungi Task</button>
        </form>
    )
}

export default AddTask;