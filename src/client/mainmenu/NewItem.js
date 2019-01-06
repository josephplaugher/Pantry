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
        <Input name="item" label="Item" />
        <Input name="brand" label="Brand" />
        <Input name="decription" label="Description" />
        <Input name="units" label="Units per package" /> 
        <Input name="store" label="Grocery Store" />
        <Input name="storage" label="Storage Location" />
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