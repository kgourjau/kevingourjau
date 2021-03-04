import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap'
import {useAppContext} from "../../lib/user.js"
import styles from "./profile.module.css"
import getAbsoluteURL from "../urls/urls.js"


const sexData = {
    "": "Sélectionner",
    male: "Male",
    female: "Female",
    other: "Other",
}

async function updateUser(field, old_value, new_value) {
    const rawResponse = await fetch('/api/user', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({field: field, old_value: old_value, new_value: new_value})
    });

    const content = await rawResponse.json();

    return content
}

const Button = (props) => <button className={props.my_class} onClick={props.onClick} disabled={props.disabled}>{props.name}</button>
const Input = (props) => <input
    className={"form-control"}
    type="text" id={"fid_" + props.title}
    name={"fn_" + props.title}
    defaultValue={props.value || ""} onChange={props.handleChange}/>

const Selector = (props) => (
    <select
        className={"form-control"} value={props.selected} onChange={props.handleChange}>
        {Object.entries(props.data).map(function ([key, value]) {
            return <option key={key} value={key} disabled={key === ""}>{value}</option>
        })}
    </select>
)

const SexSelector = (props) => <Selector data={props.data} selected={props.selected} handleChange={props.handleChange}/>

function Profile(props) {
    const [modify, setModify] = useState(false);
    const [inputValue, setInputValue] = useState(props.data.value);
    const [currentValue, setCurrentValue] = useState(props.data.value);

    function toggleModify() {
        // console.log("HOST")
        // console.log(HOST)
        // console.log("VERCEL_URL")
        // console.log(VERCEL_URL)
        console.log(getAbsoluteURL("/api/users"))
        setCurrentValue(inputValue)
        setModify(!modify)
        props.toggle()
    }

    function save() {
        let res = updateUser(props.data.field_name, inputValue, currentValue)
        // console.log(res)
        res.then(
            function (response) {
                // console.log("v")
                // console.log(response)
                if (response.message === "update successful") {
                    setInputValue(currentValue)
                    toggleModify()
                }
            })
            .catch(error => {
                setCurrentValue(inputValue)
                toggleModify()
            })


    }

    function handleChange(event) {
        // console.log(event.target.value)
        setCurrentValue(event.target.value)
    }

    return (
        <div className={styles.section}>
            <div className={styles.row}>
                <Row><Col><div className={styles.title}>{props.data.title}</div></Col><Col>
                    <Button my_class={styles.button_modify} name={!modify ? "Modify" : "Cancel"} disabled={props.disable} onClick={() => toggleModify()}/>
                </Col></Row>
            </div>
            <div className={styles.row}>
            {!modify ?
                <Row><Col>{inputValue}</Col></Row>
                :
                <>
                    <Row><Col><div className={styles.description}>{props.data.description}</div></Col></Row>
                    <Row><Col>
                        {props.data.datatype === "input" ?
                            <Input title={props.data.title} value={inputValue} handleChange={(e) => handleChange(e)}/>
                            :
                            <SexSelector data={props.data.values} selected={currentValue}
                                         handleChange={(e) => handleChange(e)}/>
                        }
                    </Col></Row>
                    <Row><Col>
                        <Button my_class={styles.button_save} name="Save" disabled={false} onClick={() => save()}/>
                    </Col></Row>

                </>
            }
            </div>
        </div>
    )
}

const Form = (props) => {
    const {user, loading, login, count, increment, logout} = useAppContext()

    const [modify, setModify] = useState(false);
    const [modifyKey, setModifyKey] = useState(-1);
    const [data, setData] = useState([]);
    const [aaa, setAAA] = useState("aaaa");

    let data2 = ([
        {
            field_name: "given_name",
            title: "First Name",
            description: "blablabla",
            value: user ? user.given_name : "",
            datatype: "input"
        },
        {
            field_name: "family_name",
            title: "Last Name",
            description: "",
            value: user ? user.family_name : "",
            datatype: "input"
        },
        {
            field_name: "gender",
            title: "Sex",
            description: "",
            value: user ? user.gender : "",
            value2: user ? user.gender : "",
            datatype: "select",
            values: sexData
        },
        {
            field_name: "description",
            title: "Description",
            description: "",
            value: user ? user.description : "",
            datatype: "input"
        }
    ]);

    useEffect(() => {
        // console.log("loading")
        // console.log(loading)
        // console.log("loading")
        // console.log(loading)
        // console.log(data2)
        // let newArray = data2;
        // newArray.splice(0, 1)
        // setData([...newArray]);
        setData(data2)
        setAAA("bbbbbb")
    }, [loading])

    const toggle = (key) => setModifyKey(modifyKey === -1 ? key : -1)

    return (
        <>
            {
                loading ?
                    "Loading..."
                    :
                    <>
                        {
                            user ?
                                <Container>
                                    {data2.map(function (item, key) {
                                        // console.log("modify :" + modify + ", modifyKey: " + modifyKey + ", key: " + key + ", Equals? " + (modify && (modifyKey !== key)))
                                        return <Profile key={key}
                                                        data={item}
                                                        disable={modifyKey !== -1 && modifyKey !== key}
                                                        toggle={(modifyChild) => toggle(key, modifyChild)}
                                        />
                                    })}
                                </Container>
                                :
                                <Container>You must be logged in</Container>
                        }
                    </>
            }
        </>
    )
}
export default Form