import React from 'react'
import EB from 'Util/EB'
import UseItem from './UseItem'
import AddToShoppingList from './AddToShoppingList'
import { FormClass, Input, Button } from 'reactform-appco'
import 'css/workingPane.css'
import 'css/form.css'

class ItemView extends FormClass {

    constructor(props) {
        super(props);
        this.state = {
            userNotify: {},
            data: {},
            editMode: false,
            item: '',
            id: '',
            description: '',
            unit: '',
            store: '',
            par: '',
            instock: '',
            shoppinglist: '',
            formData: {
                item: '',
                id: '',
                description: '',
                unit: '',
                store: '',
                par: '',
                instock: '',
                shoppinglist: ''
            }
        }
    }

    render() {

        return (
            <>
                <p className="formTitle">Item Details</p>
                <form onSubmit={this.rfa_onSubmit}>
                    <Input name="id" label="Item ID" value={this.props.data.id} onChange={this.rfa_onChange} error={this.state.userNotify.id} />
                    <Input name="item" label="item" value={this.props.data.item} onChange={this.rfa_onChange} error={this.state.userNotify.item} />
                    <Input name="description" label="Description" value={this.props.data.description} onChange={this.rfa_onChange} error={this.state.userNotify.description} />
                    <Input name="unit" label="Units per package" value={this.props.data.unit} onChange={this.rfa_onChange} error={this.state.userNotify.unit}/>
                    <Input name="store" label="Grocery Store" value={this.props.data.item} onChange={this.rfa_onChange} error={this.state.userNotify.item} />
                    <Input name="storage" label="Storage Location" value={this.props.data.storage} onChange={this.rfa_onChange} error={this.state.userNotify.storage} />
                    <Input name="par" label="Par" value={this.props.data.par} onChange={this.rfa_onChange} error={this.state.userNotify.par} />
                    <Input name="instock" label="In Stock" value={this.props.data.instock} onChange={this.rfa_onChange} error={this.state.userNotify.instock} />
                    <Input name="shoppinglist" label="Shopping List" value={this.props.data.shoppinglist} onChange={this.rfa_onChange} error={this.state.userNotify.shoppinglist} />
                    <div className="buttondiv">
                        <Button id="edit" value="Edit" />
                    </div>
                </form>
                <p className="userNotify-success">{this.state.userNotify.success}</p>
     
                <EB comp="Use Item in ItemView">
                    <UseItem itemID={this.props.data.id} getAllItems={this.props.getAllItems}/>
                </EB>
                <EB comp="Add to Shopping List in ItemView">
                    <AddToShoppingList itemData={this.props.data} getAllItems={this.props.getAllItems}/>
                </EB>
            </>
        )
    }
}

export default ItemView