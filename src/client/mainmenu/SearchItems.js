import {Form, Input, Button} from 'reactform-appco'
import React from 'react'
import ReactTable from 'react-table'
import EB from 'Util/EB'
import SetUrl from 'Util/SetUrl'
import ItemView from './ItemView'
import ValRules from 'Util/ValRules'
import LightBox from 'Util/LightBox'
import 'css/workingPane.css'
import 'css/form.css'

class SearchItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataView: false,
      table: [],
      userNotify: {}
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
      table: res.table
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

    const lsrURL = SetUrl() + '/liveSearch'
    return (
      <div id="workingPane">
        <Form formTitle="Search Pantry For Items" 
              action={`${SetUrl()}/searchItems`} 
              response={this.response}  
              valrules={ValRules}
              liveSearch={false}
              lsa={['item','store']}
              lsrURL={lsrURL} >
          <Input name="item" label="Item" className="textinput" labelClass="label" errorClass="input-error" />
          <Input name="decription" label="Description" className="textinput" labelClass="label" errorClass="input-error"  />
          <Input name="units" label="Units per package" className="textinput" labelClass="label" errorClass="input-error" /> 
          <Input name="store" label="Grocery Store" className="textinput" labelClass="label" errorClass="input-error" />
          <Input name="storage" label="Storage Location" className="textinput" labelClass="label" errorClass="input-error" />
          <div className="buttondiv">
            <Button id="submit" value="Search" />
          </div>
        </Form><br/>
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