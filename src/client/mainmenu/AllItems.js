import React from 'react'
import Ajax from 'Util/Ajax'
import ReactTable from 'react-table'
import EB from 'Util/EB'
import SetUrl from 'Util/SetUrl'
import LightBox from 'Util/LightBox'
import {Form, Input, Button} from 'reactform-appco'
import 'css/workingPane.css'
import 'css/form.css'
import 'react-table/react-table.css'

class AllItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataView: false,
      table:[],
      userNotify: {}
    }
  }
  
  componentDidMount() {
      Ajax.get(SetUrl() + "/getAllItems")
      .then(res => {
          this.setState({
            table: res.data.table
          })
      })
  }
  
  selectItem = (row) => {
    //switch from data view to search view
    this.setState({ dataView: true, userNotify: ''});

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

    render() {
      const columns = [
        {Header: 'Item', accessor: 'item'},
        {Header: 'Description', accessor: 'description'},
        {Header: 'Units per Package', accessor: 'units'},
        {Header: 'Grocery Store', accessor: 'store'},
        {Header: 'Storage Location', accessor: 'storage'}]

      return (
        <div id="workingPane">
          <p className="formTitle">All Pantry Items</p>
            <div >
            <EB comp="ReactTable in COA">
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
                <Form formTitle="Item Details" onSubmit={this.onSubmit}  >
                <Input name="item" label="item" prePopVal={this.state.item} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="description" label="Description" prePopVal={this.state.description} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="unit" label="Units per package" prePopVal={this.state.unit} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="store" label="Grocery Store" prePopVal={this.state.store} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="storage" label="Storage Location" prePopVal={this.state.storage} className="textinput" labelClass="label" errorClass="input-error" />
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

export default AllItems;