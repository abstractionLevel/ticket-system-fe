import React, { useEffect, useState } from 'react';
import { addEmployee } from '../../service/employeeService';
import { getAllRole } from '../../service/teams';

const AddEmployee = (props) => {

    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [role, setRole] = useState(null);
    const [teams,setTeams] = useState(null);
    const [teamId,setTeamId] = useState(null);

    useEffect(()=>{
        getAllRole()
            .then(response=>setTeams(response))
    },[])

    const handleSubmit = (event) => { 
        event.preventDefault();
        const pyload = {
            "nome": nome,
            "cognome": cognome,
            "roleId": role,
            "teamId":teamId
        }
        addEmployee(pyload)
            .then(response => {//mostrato lo il tasks e resettare i campi
            })
            .catch(error => {
                console.log(error);
                return null;
            });
        
       
    }

    return (
        <form onSubmit={handleSubmit} className="mt-5">
            <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input type="text" className="form-control" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="cognome">Cagnome</label>
                <input type="text" className="form-control" id="nome" value={cognome} onChange={(e) => setCognome(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="status">Ruole</label>
                <select className="form-control" id="status" value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="">Seleziona un ruolo</option>
                    <option value="2">Dev</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="status">Assegna ad un team</label>
                <select className="form-control" id="status" value={teamId} onChange={(e) => setTeamId(e.target.value)} required>
                    <option value="">seleziona team</option>
                    {teams && teams.map(value=>(
                        <option value={value.id}>{value.nome}</option>
                    ))}
                    
                </select>
            </div>
            <button type="submit" className="btn btn-primary mt-4">Aggiungi Employee</button>
        </form>
    )
}

export default AddEmployee;