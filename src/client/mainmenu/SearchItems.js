import {Form, Input, Button} from 'reactform-appco'
import React from 'react'
import ReactTable from 'react-table'
import EB from 'Util/EB'
import SetUrl from 'Util/SetUrl'
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
    this.setState({ dataView: true, userNotify: {}});

    //place all the resulting data into state
    for(var key in row){
      //clear previous selection
      //fill with new data select
      this.setState({
        [key]: row[key]
      }); 
    }
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

    return (
      <div id="workingPane">
        <Form formTitle="Search Pantry For Items" 
              action={`${SetUrl()}/searchItems`} 
              response={this.response}
              valrules={ValRules}  >
          <Input name="item" label="Item" />
          <Input name="decription" label="Description" />
          <Input name="units" label="Units per package" /> 
          <Input name="store" label="Grocery Store" />
          <Input name="storage" label="Storage Location" />
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
                <Form formTitle="Transactions Details" clearOnSubmit="false" >
                <Input name="transid" label="Trans ID" prePopVal={this.state.transid} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="itemdate" label="Item Date" prePopVal={this.state.itemdate} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="gldate" label="Ledger Date" prePopVal={this.state.gldate} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="debit" label="Debit" prePopVal={this.state.debit} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="credit" label="Credit" prePopVal={this.state.credit} className="textinput" labelClass="label" errorClass="input-error" /> 
                <Input name="transtype" label="Transaction Type" prePopVal={this.state.transtype} className="textinput" labelClass="label" errorClass="input-error" />
                </Form>
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