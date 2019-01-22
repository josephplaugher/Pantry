import React from 'react'
import { Form, Input, Button } from 'reactform-appco'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'
import 'css/workingPane.css'
import 'css/form.css'

class ShoppingMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <>
                <Button onClick={() => this.props.saveForLater(this.props.currentItem)} value="Save For Later" /><br /><br />
                <Button onClick={() => this.props.remove(this.props.currentItem)} value="Remove From List" />
                <Form 
                    action={`${SetUrl()}/markPurchased`}
                    response={() => this.props.saveForLater(this.props.currentItem)}
                    valrules={ValRules}
                    extraData={{ id: this.props.currentItem.id }} >
                    <Input name="quantity" label="Quantity" className="textinput" labelClass="label" errorClass="input-error" />
                    <div className="buttondiv">
                        <Button id="submit" value="Mark Purchased" />
                    </div>
                </Form>
            </>
        )
    }
}

export default ShoppingMenu