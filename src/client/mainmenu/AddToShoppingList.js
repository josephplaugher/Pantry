import React from 'react'
import { Form, Input, Button } from 'reactform-appco'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'
import 'css/form.css'

class AddToShoppingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userNotify: '',
            v: undefined
        }
        this.response = this.response.bind(this);
    }

    response = (res) => {
        if(res.success === true) {
          let msg = res.userNotify;
          this.setState({userNotify: msg});
          this.props.getAllItems();
        }
      }

    render() {
        return (
            <>
            <br/>
                <Form formTitle="Add to Shopping List"
                    action={`${SetUrl()}/addToList`}
                    response={this.response}
                    valrules={ValRules}
                    extraData={{ id: this.props.itemData.id }} >
                    <Input name="quantity" value={this.state.v} label="How many?" className="textinput" labelClass="label" errorClass="input-error" />
                    <div className="buttondiv">
                        <Button id="submit" value="Add to List" />
                    </div>
                    <div id="notify-box">
                        <p id="userNotify">{this.state.userNotify}</p>
                    </div>
                </Form>
            </>
        )
    }
}

export default AddToShoppingList;