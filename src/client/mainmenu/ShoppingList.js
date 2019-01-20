import React from 'react'
import {Button} from 'reactform-appco'
import Ajax from 'Util/Ajax'
import ReactTable from 'react-table'
import EB from 'Util/EB'
import SetUrl from 'Util/SetUrl'
import LightBox from 'Util/LightBox'
import ItemView from './ItemView'
import 'css/workingPane.css'
import 'css/form.css'
import 'react-table/react-table.css'

class ShoppingList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataView: false,
      table:[],
      userNotify: {},
      itemViewData: {}
    }
    this.getAllItems = this.getAllItems.bind(this);
  }
  
  componentDidMount() {
    this.getAllItems();
  }

  getAllItems = () => {
    console.log('get all')
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

    render() {
      const columns = [
        {Header: 'ID', accessor: 'id', width: 30},
        {Header: 'Item', accessor: 'item'},
        {Header: 'Grocery Store', accessor: 'store'},
        {Header: 'In-Store Location', accessor: 'instore_location'},
        {Header: 'Action', Cell: (
          <>
          <input type="checkbox" name="purchased" onClick={() => this.markPurchased.bind(this)} />
          <label for="purchased">Purchased</label><br/>
          <Button onClick={() => this.remove.bind(this)} value="Remove"/> 
          </>
        ) }
      ]
 

      return (
        <div id="workingPane">
          <p className="formTitle">Shopping List</p>
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
      )
    }
}

export default ShoppingList;