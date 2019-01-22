import React from 'react'
import { Form, Input, Button } from 'reactform-appco'
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
            <Button onClick={() => this.props.saveForLater(this.props.currentItem)} value="Save For Later"/><br/><br/>
            <Button onClick={this.props.remove} value="Remove From List"/><br/><br/>
            <Button onClick={this.props.markPurchased} value="Mark Purchased"/>
            </>
        )
    }
}

export default ShoppingMenu