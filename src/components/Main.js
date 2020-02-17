import React from "react";
import Table from './Table/Table';
import {Container, Row, Col } from 'react-bootstrap';
import './Main.css';

function Main(){
    return (
        <Container className="background" fluid={true}>
            <Table />
        </Container>
    );
}

export default Main;

