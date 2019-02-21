import {FormClass, Input, Button} from 'reactform-appco'
import React from 'react'
import ReactTable from 'react-table'
import EB from 'Util/EB'
import SetUrl from 'Util/SetUrl'
import ItemView from './ItemView'
import ValRules from 'Util/ValRules'
import LightBox from 'Util/LightBox'
import 'css/workingPane.css'
import 'css/form.css'

class SearchItems extends FormClass {
  constructor(props) {
    super(props);
    this.useLiveSearch = true;
    this.lsRoute = SetUrl() + '/liveSearch'
    this.route = SetUrl() + "/searchItems"
    this.lsa = ['store','item']
    this.valRules = ValRules
    this.state = {
      dataView: false,
      table: [],
      userNotify: {},
      item: '',
      description: '',
      units: '',
      store: '',
      storage: '',
      formData: {
        item: '',
        description: '',
        units: '',
        store: '',
        storage: ''
      }
    }
  }

  selectItem = (row) => {
    //switch from data view to search view
    this.setState({ dataView: true, userNotify: ''});

    //place all the resulting data into itemViewData state
    var itemData = {}
    for(var key in row){
      itemData[key] = row[key];
    }
    this.setState({itemViewData: itemData})
  }

  closeLightBox = () => {
    this.setState({dataView: false});
  }

  response = (res) => {
    this.setState({
      table: res.data.table
    });
    if (res.error) {
      console.error('submit error: ', res.error);
    }
  }

  render() {

    const columns = [
      {Header: 'Item', accessor: 'item'},
      {Header: 'Description', accessor: 'description'},
      {Header: 'Units per Package', accessor: 'units'},
      {Header: 'Grocery Store', accessor: 'store'},
      {Header: 'Storage Location', accessor: 'storage'}]

    return (
      <div id="workingPane">
        <p className="formTitle">Search Pantry for Items</p>
        <form onSubmit={this.rfa_onSubmit}>
          <Input name="item" label="Item" value={this.state.item} onChange={this.rfa_onChange} error={this.state.userNotify.item} lsr={this.state.lsritem} />
          <Input name="decription" label="Description" value={this.state.descriptionn} onChange={this.rfa_onChange} error={this.state.userNotify.description}  />
          <Input name="units" label="Units per package" value={this.state.units} onChange={this.rfa_onChange} error={this.state.userNotify.units} /> 
          <Input name="store" label="Grocery Store" value={this.state.store} onChange={this.rfa_onChange} error={this.state.userNotify.store} lsr={this.state.lsrstore}/>
          <Input name="storage" label="Storage Location" value={this.state.storage} onChange={this.rfa_onChange} error={this.state.userNotify.storage} />
          <div className="buttondiv">
            <Button id="submit" value="Search" />
          </div>
        </form><br/>
        <div id="resultField">
        <EB comp="ReactTable in GL">
            <ReactTable
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {this.selectItem(rowInfo.original);}
                }
                }
              }
              data={this.state.table}
              columns={columns}
            />
            </EB>
        </div>
       

        <div >  
            {this.state.dataView ? (
              <div id="lightbox-container" className="lightbox-background">
              <LightBox close={this.closeLightBox} >
                <ItemView data={this.state.itemViewData}/>
              </LightBox>  
              </div>
            ):(
              null
            )}
            </div>
      </div>
    )
  }
}

export default SearchItems;