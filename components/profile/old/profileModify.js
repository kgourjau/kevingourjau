import React, {Component} from "react";

function ButtonModify(props) {
    return (
        <button className="modify" onClick={props.onClick} value="Modifier">
            {props.value}
        </button>
    );
}