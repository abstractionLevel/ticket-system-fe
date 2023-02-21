import React, { useState, useEffect } from 'react';
import { getAssignedProjects, getProjects } from '../../service/projectService';
import { Card, Button } from 'react-bootstrap';


const ProjectCard = (props) => {

    const [isCrossTeam, setIsCrossTeam] = useState(false);

    function checkSameTeamName(arr) {
        if (arr.length === 0) return true;

        const firstTeamName = arr[0].teamName;
        for (let i = 1; i < arr.length; i++) {
            //controllo il primo con tutti
            if (arr[i].teamName !== firstTeamName) {
                return false;
            }
        }
        return true;
    }

    useEffect(() => {
        getAssignedProjects(props.project.id)
            .then(response => {
                setIsCrossTeam()
                const sameTeamName = checkSameTeamName(response);
                setIsCrossTeam(sameTeamName)
            })
            .catch(error => {
                console.log(error);
                return null;
            });
    }, [props.project])


    return (
        <>
            <Card style={{ marginTop: '10px', position: 'relative' }}>
                <Card.Body>
                    <Card.Body>
                        <Card.Title>{props.project.name} </Card.Title>
                        <Card.Title>{isCrossTeam && " Cross Team"} </Card.Title>
                    </Card.Body>
                </Card.Body>
            </Card>
        </>
    )
}

export default ProjectCard;