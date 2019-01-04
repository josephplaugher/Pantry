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

class AllStores extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataView: false,
      table:[],
      userNotify: {}
    }
  }
  
  componentDidMount() {
      Ajax.get(SetUrl() + "/getAllStores")
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
        {Header: 'Store Name', accessor: 'store'},
        {Header: 'ID', accessor: 'id'}]

      return (
        <div id="workingPane">
          <p className="formTitle">All Grocery Stores</p>
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
                <Form formTitle="Store Details" onSubmit={this.onSubmit}  >
                <Input name="id" label="Store ID" prePopVal={this.state.id} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="store" label="Store Name" prePopVal={this.state.store} className="textinput" labelClass="label" errorClass="input-error" />
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

export default AllStores;