import Layout from '../components/layout.js'
import {Container, Row, Col, Button, Form} from 'react-bootstrap'
import React, {useState} from "react";

async function updateUser(endpoint, data) {
    const rawResponse = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    });

    const content = await rawResponse.json();

    return content
}

const Profile = () => {
    const [endpoint, setEndpoint] = useState("");
    const [data, setData] = useState("");
    const [rslt, setRslt] = useState("");

    function handleChange(event) {
        // console.log(event.target.value)
        setEndpoint(event.target.value)
    }

    function handleChange2(event) {
        // console.log(event.target.value)
        setData(event.target.value)
    }
    async function callback(endpoint,data){
        const rawResponse = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        });

        let content = await rawResponse.json();
        setRslt(JSON.stringify(content))
    }
    return (
        <Layout>
            <h1>PostMan</h1>
            <Row>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={12}  value={endpoint} onChange={(e) => handleChange(e)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea2">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={12}  value={data} onChange={(e) => handleChange2(e)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea3">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={12}  value={rslt}/>
                </Form.Group>
                <Button onClick={()=>callback(endpoint,data)}>Load</Button>
            </Row>
        </Layout>
    )
}

export default Profile
