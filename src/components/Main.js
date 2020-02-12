import React from "react";
import logo from '../logo.svg';
import table from '../poker_table.jpg';
import Table from './Table';
import {Container, Row, Col } from 'react-bootstrap';
import './Main.css';

function Main(){
    return (
        <Container fluid={true}>
            <Table />
        </Container>
    );
}

export default Main;

