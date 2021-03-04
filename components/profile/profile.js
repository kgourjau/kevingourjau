import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap'

const sexData = {
    "": "Sélectionner",
    male: "Male",
    female: "Female",
    other: "Other",
}

const data2 = [
    {title: "First Name", description: "blablabla", value: "Kévin", datatype: "input"},
    {title: "Last Name", description: "", value: "Gourjau", datatype: "input"},
    {title: "Sex", description: "", value: "Male", value2: "male", datatype: "select", values: sexData},
    {title: "Description", description: "", value: "Dev", datatype: "input"}
]

const Button = (props) => <button onClick={props.onClick} disabled={props.disabled}>{props.name}</button>
const Input = (props) => <input type="text" id={"fid_" + props.title}
                                name={"fn_" + props.title}
                                defaultValue={props.value || ""} onChange={props.handleChange}/>

const Selector = (props) => (
    <select value={props.selected} onChange={props.handleChange}>
        {Object.entries(props.data).map(function ([key, value]) {
            return <option key={key} value={key} disabled={key === ""}>{value}</option>
        })}
    </select>
)

function Example() {
    // Déclaration d'une nouvelle variable d'état, que l'on appellera “count”
    const [count, setCount] = useState(0);
    useEffect(() => {
        // Met à jour le titre du document via l’API du navigateur
        document.title = `Vous avez cliqué ${count} fois`;
    });
    return (
        <div>
            <p>Vous avez cliqué {count} fois</p>
            <button onClick={() => setCount(count + 1)}>
                Cliquez ici
            </button>
        </div>
    );
}

const SexSelector = (props) => <Selector data={props.data} selected={props.selected} handleChange={props.handleChange}/>


function Section(props) {
    const [modify, setModify] = useState(false);
    const [disable, setDisable] = useState(props.disable);
    const [inputValue, setInputValue] = useState(props.data.value);
    const [currentValue, setCurrentValue] = useState(props.data.value);

    useEffect(() => {
        // Met à jour le titre du document via l’API du navigateur

    });

    function toggleModify() {
        setCurrentValue(inputValue)
        setModify(!modify)
        props.toggle()
    }

    function save() {
        setInputValue(currentValue)
        toggleModify()
    }

    function handleChange(event) {
        console.log(event.target.value)
        setCurrentValue(event.target.value)
    }

    return (
        <div>
            <Row><Col>{props.data.title}</Col><Col>
                <Button name={!modify ? "Modify" : "Cancel"} disabled={props.disable} onClick={() => toggleModify()}/>
            </Col></Row>

            {!modify ?
                <Row><Col>{inputValue}</Col></Row>
                :
                <>
                    <Row><Col>{props.data.description}</Col></Row>
                    <Row><Col>
                        {props.data.datatype === "input" ?
                            <Input title={props.data.title} value={inputValue} handleChange={(e) => handleChange(e)}/>
                            :
                            <SexSelector data={props.data.values} selected={currentValue}
                                         handleChange={(e) => handleChange(e)}/>
                        }
                    </Col></Row>
                    <Row><Col>
                        <Button name="Save" disabled={false} onClick={() => save()}/>
                    </Col></Row>
                    <Row><Col><Example/></Col></Row>
                </>
            }
        </div>
    )
}

const Form = (props) => {
    const [modify, setModify] = useState(false);
    const [modifyKey, setModifyKey] = useState(-1);
    const [data, setData] = useState(data2);

    const toggle = (key) => setModifyKey(modifyKey === -1 ? key : -1)

    return (
        <Container>
            {data.map(function (item, key) {
                console.log("modify :" + modify + ", modifyKey: " + modifyKey + ", key: " + key + ", Equals? " + (modify && (modifyKey !== key)))
                return <Section key={key}
                                data={item}
                                disable={modifyKey !== -1 && modifyKey !== key}
                                toggle={(modifyChild) => toggle(key, modifyChild)}
                />
            })}
        </Container>
    )
}
export default Form