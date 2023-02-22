import React, { useEffect, useState } from 'react';
import { getPms } from '../../service/employeeService';
import { createProject } from '../../service/projectService';

const FormAddProject = (props) => {

    const [pms,setPms] = useState(null);
    const [pmId,setPmId] = useState(null);
    const [nomeProject,setNomeProject] = useState(null);

    useEffect(() => {
        getPms()
            .then(pms=>setPms(pms))
            .catch(error=>console.log(error))
    },[])

 
    const handleSubmit = (event) => { 
        event.preventDefault();
        const pyload = {
            "name": nomeProject,
            "pmId":pmId
        }
        createProject(pyload)
            .then(response=>{
                window.location.reload(false);
            })
            .catch(error=>console.log(error)) 
    }

    return (
        <form onSubmit={handleSubmit} className="mt-5">
            <div className="form-group">
                <label htmlFor="description">nome progetto</label>
                <input type="text" className="form-control" id="description" value={nomeProject} onChange={(e) => setNomeProject(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="status">Stato</label>
                <select className="form-control" id="status" value={pmId} onChange={(e) => setPmId(e.target.value)} required>
                    <option value="">assegna ad un pm</option>
                    {pms && pms.map(pm=>(
                        <option value={pm.id}>{pm.nome}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary mt-4">Aggiungi Progetto</button>
        </form>
    )
}

export default FormAddProject;