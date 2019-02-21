import {FormClass, Input, Button} from 'reactform-appco'
import React from 'react'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'
import 'css/workingPane.css'
import 'css/form.css'
import 'css/userNotify.css'
import 'css/lsr.css'

class NewItem extends FormClass{
  
  constructor(props) {
    super(props);
    this.useLiveSearch = true
    this.lsa = ['store']  //live search array. List of input names that will trigger a live search
    this.lsRoute = SetUrl() + "/liveSearch"
    this.route = SetUrl() + "/newItem"
    this.valRules = ValRules
    this.state = {
      dataView: false,
      table: [],
      userNotify: {},
      formData: {
        item: '',
        brand: '',
        description: '',
        units: '',
        par: '',
        instock: '',
        storage: '',
        store: '',
        instore_location: ''
      },
      item: '',
      brand: '',
      description: '',
      units: '',
      par: '',
      instock: '',
      storage: '',
      store: '',
      instore_location: ''
    }
    this.response = this.response.bind(this);
  }

  response = (res) => {
    if(res.data.success === true) {
      let msg = res.data.userNotify;
      this.setState({userNotify: msg});
    }
  }

  render() {

    return (
      <>
      <div id="workingPane">
      <p className="formTitle">Create New Grocery item</p>
      <form onSubmit={this.rfa_onSubmit}>
        <Input name="item" label="Item" value={this.state.item} onChange={this.rfa_onChange} error={this.state.userNotify.item}/>
        <Input name="brand" label="Brand" value={this.state.brand} onChange={this.rfa_onChange} error={this.state.userNotify.brand}/>
        <Input name="description" label="Description" value={this.state.description} onChange={this.rfa_onChange} error={this.state.userNotify.description}/>
        <Input name="units" label="Units per package" value={this.state.units} onChange={this.rfa_onChange} error={this.state.userNotify.units}/> 
        <Input name="par" label="Par" value={this.state.par} onChange={this.rfa_onChange} error={this.state.userNotify.par}/> 
        <Input name="instock" label="In Stock" value={this.state.instock} onChange={this.rfa_onChange} error={this.state.userNotify.instock}/>
        <Input name="storage" label="Storage Location" value={this.state.storage} onChange={this.rfa_onChange} error={this.state.userNotify.storage} lsr={this.state.lsrstorage}/>
        <Input name="store" label="Grocery Store" value={this.state.store} onChange={this.rfa_onChange} error={this.state.userNotify.store} lsr={this.state.lsrstore}/>
        <Input name="instore_location" label="In-Store Location" value={this.state.instore_location} onChange={this.rfa_onChange} error={this.state.userNotify.instore_location}/>
        <div className="buttondiv">
          <Button id="submit" value="Save New Item" />
        </div>
       </form>
       <p className="userNotify-success">{this.state.userNotify.success}</p>
      </div>
      </>
    )
  }
}

export default NewItem;