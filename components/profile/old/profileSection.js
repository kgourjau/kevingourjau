import React from "react";
import styles from "./profileForm.module.css"

const Button = (props) => (
    <button onClick={props.onClick} disabled={props.disabled}>
        {props.name}
    </button>
)


const Row = ({children}) => <div className="row">{children}</div>

const Description = ({description}) => description != "" ? <div className={styles.description}>
    <div className="col-12">{description}</div>
</div> : ""

const sexSelectorData = {
    default: {value: "", name: "Sélectionner"},
    options: [
        {value: "male", name: "Male"},
        {value: "female", name: "Female"},
        {value: "other", name: "Other"},
    ]
}
const getName = (data,value) => {
    for(let i=0;i<data.options.length;i++){
        // console.log(data.options[i].value)
        // console.log(value)
        if(data.options[i].value === value){
            return data.options[i].name
        }
    }
    return ""
}

const Options = (props) =>
    props.options.map(function (item) {
        console.log(item.value)
        console.log(props.selectedOption)
        return <option selected={item.value === props.selectedOption} value={item.value}>{item.name}</option>
    })

const Selector = (props) => {
    return (
        <select onChange={props.handleChange}>
            <option disabled value={props.data.default.value}>{props.data.default.name}</option>
            {
                <Options options={props.data.options} selectedOption={props.selectedOption}/>
            }
        </select>
    )
}

class ProfileSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: this.props.data.value,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        console.log("ok")
        this.setState({
            inputValue: event.currentTarget.value
        })
    }
    handleClick(){
        this.setState({inputValue:this.props.data.value})
        this.props.onClick()
    }
    renderButtonModify(i) {
        return <div className={styles.buttonModify}><Button name={this.props.modify ? "Cancel" : "Modify"}
                       onClick={() => this.handleClick()} disabled={this.props.disabled}/></div>
    }

    renderButtonSave() {
        return <div className={styles.buttonSave}><Button name="Save" value="Save" onClick={() => this.props.onSave(this.state.inputValue)}/></div>
    }

    renderSubSection() {
        return this.props.modify ?
            <>
                <Description description={this.props.data.description}/>
                <Row>
                    {this.props.data.datatype === "input" ?
                        <input type="text" id={"fid_" + this.props.data.title}
                               name={"fn_" + this.props.data.title}
                               defaultValue={this.props.data.value || ""}
                        onChange={this.handleChange}/> :
                        <Selector data={sexSelectorData} selectedOption={this.props.data.value} handleChange={this.handleChange}/>
                    }
                </Row>
                <Row>
                    <div className="col-12">{this.renderButtonSave()}</div>
                </Row>
            </> :
            <div>
            <div className="row">
                <div className="col-12">
                    {this.props.data.datatype === "input" ? this.props.data.value:getName(sexSelectorData,this.props.data.value)}
                </div>
            </div>
            </div>
    }

    render() {
        return (
            <div className={styles.section}>
                <div className="row">
                    <div className="col-6"><div className={styles.title}>{this.props.data.title}</div></div>
                    <div className="col-6">
                        {this.renderButtonModify(this.props.i)}
                    </div>
                </div>
                <>
                    {this.renderSubSection()}
                </>
            </div>
        );
    }

}

export default ProfileSection