import React from "react";
import ProfileSection from "./profileSection";
import styles from "./profileForm.module.css"
import {Container} from 'react-bootstrap'
import SexSelector from './Section'


class ProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modify: Array(4).fill(false),
            disabled: Array(4).fill(false),
            data:
                [
                    {title: "First Name", description: "blablabla", value: "Kévin", datatype:"input"},
                    {title: "Last Name", description: "", value: "Gourjau", datatype:"input"},
                    {title: "Sex", description: "", value: "male", datatype:"select"},
                    {title: "Description", description: "", value: "Dev", datatype:"input"}
                ]
        };
    }

    handleClick(i) {
        let modify = [...this.state.modify]
        let disabled = []

        modify[i] = !modify[i]

        if (modify[i]){
            disabled = Array(4).fill(true)
            disabled[i] = false
        }
        else{
            disabled = Array(4).fill(false)
        }
        this.setState({
            modify: modify,
            disabled:disabled,
        })
    }
    onSave(i,newValue) {
        // console.log(newValue)
        let data = [...this.state.data]

        data[i]["value"] = newValue

        this.setState({
            data: data,
        })
        this.handleClick(i)
    }
    renderSections() {
        let rows = [];
        for (let i = 0; i < this.state.data.length; i++) {
            rows.push(
                <ProfileSection key={i}
                                data={this.state.data[i]}
                                modify={this.state.modify[i]}
                                disabled={this.state.disabled[i]}
                                onClick={() => this.handleClick(i)}
                                onSave={(newValue) => this.onSave(i,newValue)}/>
            )
        }
        return rows
    }

    render() {
        return (
            <Container className={styles.formContainer}>
                <h3>Form</h3>
                {this.renderSections()}
                {/*{this.state.data.map(function (item, i) {*/}
                {/*    this.renderSection(i, this)*/}
                {/*}, this)}*/}
                {/*<ProfileSection data={this.state.data[0]} modify={this.state.modify[0]} onClick={()=> this.handleClick(0)}/>*/}
                {/*{this.renderSection(1)}*/}
                <SexSelector/>
            </Container>
        );
    }
}

export default ProfileForm