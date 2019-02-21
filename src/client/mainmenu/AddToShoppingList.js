import React from 'react'
import { FormClass, Input, Button } from 'reactform-appco'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'
import 'css/form.css'

class AddToShoppingList extends FormClass {
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
            <p className="formTitle">Add to Shopping List</p>
                <form onSubmit={this.rfa_onSubmit}>
                    <Input name="quantity" value={this.state.v} onChange={this.rfa_onChange} error={this.state.userNotify.quantity} />
                    <div className="buttondiv">
                        <Button id="submit" value="Add to List" />
                    </div>
                    <div id="notify-box">
                        <p id="userNotify">{this.state.userNotify}</p>
                    </div>
                </form>
            </>
        )
    }
}

export default AddToShoppingList;