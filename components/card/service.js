import {Card} from 'react-bootstrap'
import styles from './service.module.css'
import {Col, Container, Row} from 'react-bootstrap'
import React from "react";


function Icon({name}){
    return (
        <i class={name}></i>
    )
}

const Service = ({settings}) => {
    const Img = "img_url" in settings ? <Card.Img variant="top" src={settings.img_url}/> : ""
    const Title = "img_url" in settings ? <Card.Title>{settings.title}</Card.Title> : ""
    const Subtitle = "img_url" in settings ? <Card.Subtitle className="mb-2 text-muted">{settings.subtitle}</Card.Subtitle> : ""
    const Text = "img_url" in settings ? <Card.Text>{settings.text}</Card.Text> : ""

    return (
        <Card className={styles.card}>
            <Card.Body>
                <Row>
                    <Col md={3}>
                        <div className={styles.icon_wrapper}>
                        <Icon name={settings.icon_name + " " + styles.icon}/>
                    </div>
                    </Col>
                    <Col md={9}>
                        {Title}
                        {Text}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
export default Service