import Service from './service.js'
import {Col} from "react-bootstrap";
import React from "react";


const Services = ({cards}) => {
    return (
        cards.map((e) => <Col sm={4}><Service settings={e}/></Col>)
    )
}
export default Services