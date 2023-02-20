import React from 'react';
import { Card } from 'react-bootstrap';
import './taskCard.scss';

const TaskCard = ({ description, status, deadline, creator }) => {


    return (
        <Card >
            <Card.Body>
                <Card.Body>
                    <Card.Title>{description}</Card.Title>
                    <Card.Text>Status: {status}</Card.Text>
                    <Card.Text>Deadline: {deadline}</Card.Text>
                </Card.Body>
            </Card.Body>
        </Card>
    )
}

export default TaskCard;