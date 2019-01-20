import React from 'react'
import EB from 'Util/EB'
import UseItem from './UseItem'
import { Form, Input, Button } from 'reactform-appco'
import 'css/workingPane.css'
import 'css/form.css'

class ItemView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userNotify: {},
            data: {}
        }
    }

    render() {
        return (
            <>
                <Form formTitle="Item Details" onSubmit={this.onSubmit}  >
                    <Input name="id" label="Item ID" prePopVal={this.props.data.id} className="textinput" labelClass="label" errorClass="input-error" />
                    <Input name="item" label="item" prePopVal={this.props.data.item} className="textinput" labelClass="label" errorClass="input-error" />
                    <Input name="description" label="Description" prePopVal={this.props.data.description} className="textinput" labelClass="label" errorClass="input-error" />
                    <Input name="unit" label="Units per package" prePopVal={this.props.data.unit} className="textinput" labelClass="label" errorClass="input-error" />
                    <Input name="store" label="Grocery Store" prePopVal={this.props.data.store} className="textinput" labelClass="label" errorClass="input-error" />
                    <Input name="storage" label="Storage Location" prePopVal={this.props.data.storage} className="textinput" labelClass="label" errorClass="input-error" />
                    <Input name="par" label="Par" prePopVal={this.props.data.par} className="textinput" labelClass="label" errorClass="input-error" />
                    <Input name="instock" label="In Stock" prePopVal={this.props.data.instock} className="textinput" labelClass="label" errorClass="input-error" />
                    <Input name="shoppinglist" label="Shopping List" prePopVal={this.props.data.shoppinglist} className="textinput" labelClass="label" errorClass="input-error" />
                    <div className="buttondiv">
                        <Button id="submit" value="Save Changes" />
                    </div>
                </Form>
                <EB comp="Use Item in AllItems">
                    <UseItem itemID={this.props.data.id} getAllItems={this.props.getAllItems}/>
                </EB>
            </>
        )
    }
}

export default ItemView