import React, { useState, useEffect } from 'react';
import { getAssignedProjects, getProjects } from '../../service/projectService';
import { Card, Button } from 'react-bootstrap';


const ProjectCard = (props) => {

    const [isCrossTeam, setIsCrossTeam] = useState(null);

    function checkSameTeamName(arr) {
        if(arr.length === 0) return false;
        const firstTeamName = arr[0].teamName;
        for (let i = 1; i < arr.length; i++) {
            // console.log(props.project.name , " :" ,arr[i].teamName , " = " ,firstTeamName)
            if (arr[i].teamName !== firstTeamName) {
                return false;
            }
        }
        return true;
    }

    useEffect(() => {
         
        getAssignedProjects(props.project.id)
            .then(response => {
                if(response.length>0) {
                    console.log(props.project.name)
                    console.log( response)
                    const sameTeamName = checkSameTeamName(response);
                    setIsCrossTeam(sameTeamName)
                }
               
            })
            .catch(error => {
                console.log(error);
                return null;
            });
    }, [props.project])
    // console.log(props.project.name , " :" , isCrossTeam)


    return (
        <>
            <Card style={{ marginTop: '10px', position: 'relative' }}>
                <Card.Body>
                    <Card.Body>
                        <Card.Title>{props.project.name} </Card.Title>
                        <Card.Title>{(!isCrossTeam && isCrossTeam!=null) ? " Cross Team" : ""} </Card.Title>
                    </Card.Body>
                </Card.Body>
            </Card>
        </>
    )
}

export default ProjectCard;