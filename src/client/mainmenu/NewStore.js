import {Form, Input, Button} from 'reactform-appco'
import React from 'react'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'
import 'css/workingPane.css'
import 'css/form.css'
import 'css/userNotify.css'
//import 'css/lsr.css'

class NewStore extends React.Component{
  
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
      <Form formTitle="New Store" 
            action={`${SetUrl()}/newStore`} 
            response={this.response}  
            valrules={ValRules}>
        <Input name="store" label="Store Name" className="textinput" labelClass="label" errorClass="input-error"/>
        <div className="buttondiv">
          <Button id="submit" value="Save New Store" />
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

export default NewStore;