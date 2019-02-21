import React from 'react'
import { FormClass, Input, Button } from 'reactform-appco'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'
import 'css/workingPane.css'
import 'css/form.css'

class ShoppingMenu extends FormClass {

    constructor(props) {
        super(props);
        this.route = SetUrl() + "/markPurchased"
        this.state = {
            userNotify: {},
            quantity: ''
        }
        this.response = this.response.bind(this)
    }

    response = () => {
        this.props.saveForLater(this.props.currentItem)
    }

    render() {
        return (
            <>
                <Button onClick={() => this.props.saveForLater(this.props.currentItem)} value="Save For Later" /><br /><br />
                <Button onClick={() => this.props.remove(this.props.currentItem)} value="Remove From List" />
                <form onSubmit={this.rfa_onSubmit}>
                    <Input name="quantity" label="Quantity" value={this.state.quanity} onChange={this.rfa_onChange} error={this.state.userNotify.quantity} />
                    <div className="buttondiv">
                        <Button id="submit" value="Mark Purchased" />
                    </div>
                </form>
            </>
        )
    }
}

export default ShoppingMenu