import {Form, Input, Button} from 'reactform-appco'
import React from 'react'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'
import 'css/workingPane.css'
import 'css/form.css'
import 'css/userNotify.css'
import 'css/lsr.css'

class NewItem extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {
      dataView: false,
      table: [],
      userNotify: ''
    }
    this.response = this.response.bind(this);
  }

  response = (res) => {
    console.log('resp:', res)
    if(res.success === true) {
      let msg = res.userNotify;
      this.setState({userNotify: msg});
    }
  }

  render() {

    return (
      <div>
      <div id="userNotify">
      </div>
      <div id="workingPane">
      <Form formTitle="New Item" 
            action={`${SetUrl()}/newItem`} 
            response={this.response}  
            valrules={ValRules}>
        <Input name="item" label="Item" className="textinput" labelClass="label" errorClass="input-error"/>
        <Input name="brand" label="Brand" className="textinput" labelClass="label" errorClass="input-error"/>
        <Input name="decription" label="Description" className="textinput" labelClass="label" errorClass="input-error"/>
        <Input name="units" label="Units per package" className="textinput" labelClass="label" errorClass="input-error"/> 
        <Input name="par" label="Par" className="textinput" labelClass="label" errorClass="input-error"/> 
        <Input name="instock" label="In Stock" className="textinput" labelClass="label" errorClass="input-error"/>
        <Input name="storage" label="Storage Location" className="textinput" labelClass="label" errorClass="input-error"/>
        <Input name="store" label="Grocery Store" className="textinput" labelClass="label" errorClass="input-error"/>
        <Input name="instore_location" label="In-Store Location" className="textinput" labelClass="label" errorClass="input-error"/>
        <div className="buttondiv">
          <Button id="submit" value="Save New Item" />
        </div>
        <div>
          <p id="userNotify">{this.state.userNotify}</p>
        </div>
      </Form>
      </div>
      </div>
    )
  }
}

export default NewItem;