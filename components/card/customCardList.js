import CustomCard from './customCard.js'
import {Col} from "react-bootstrap";
import React from "react";


const CardCustom = ({cards}) => {
    return (
        cards.map((e) => <Col sm={3}><CustomCard settings={e}/></Col>)
    )
}
export default CardCustom