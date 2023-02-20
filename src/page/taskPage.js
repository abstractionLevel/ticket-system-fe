import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import TaskCard from '../component/taskCard/taskCard';
import { getTasks } from '../service/taskService';

const TaskPage = (props) => {

    const [tasks,setTasks] = useState(null);

    // const tasks = [
    //     { description: "Implementare una funzionalità di autenticazione utente", status: "In elaborazione", deadline: "01/03/2023" },
    //     { description: "Refactoring di un componente React esistente", status: "Da fare", deadline: "15/04/2023" },
    //     { description: "Aggiornamento di un database MySQL", status: "Completato", deadline: "25/02/2023" }
    // ];

    useEffect(()=>{
        getTasks()
            .then(tasks=>setTasks(tasks))
            .catch(error=>console.log(error))
    },[])

    console.log(tasks)
    return (
        <Container >
            {tasks && tasks.map((value,index)=>(
                <TaskCard description={value.description} status={value.status} deadline={value.deadline}/>
            ))}
            
        </Container >
    )
}

export default TaskPage;