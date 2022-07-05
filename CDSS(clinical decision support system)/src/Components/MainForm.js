import React, { Component } from 'react'
import TestBtns from './TestBtns'
import './style.css'

export default class MainForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: require('../Assets/drug1.json')
        }
        this.getFormFields = this.getFormFields.bind(this)
    }

    getFormFields(data) {
        if (data.fields != undefined && data.fields.length > 0) {
            return data.fields.map((field) => {
                if (field.type.toLowerCase() == "dropdown") {
                    return (
                        <div className="field_div" key={field.key}>
                            <label htmlFor={field.label}>{field.label}</label>
                            <select className='form-control'>
                                {
                                    field.items.map((item) => {
                                        return (
                                            <option value={item.value}>{item.text}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    )
                }
                return (
                    <div className="field_div" key={field.key}>
                        <label htmlFor={field.label}>{field.label}</label>
                        <input type={field.type} id={field.label} readOnly={field.isReadonly} required={field.isRequired} className="form-control" />
                    </div>
                )
            })
        }
    }
    render() {
        console.log(this.state.data)
        return (
            <div className='outer_box'>
                <div className='heading'>
                    <h2>Clinical Decision Support System</h2>
                </div>
                <TestBtns
                    Drug1={() => this.setState({ data: require('../Assets/drug1.json') })}
                    Drug2={() => this.setState({ data: require('../Assets/drug2.json') })}
                />
                <div className="formBox">
                    {
                        this.getFormFields(this.state.data)
                    }
                </div>
            </div>
        )
    }
}
