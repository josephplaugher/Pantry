import React from 'react'
import Ajax from 'Util/Ajax'
import ReactTable from 'react-table'
import EB from 'Util/EB'
import SetUrl from 'Util/SetUrl'
import LightBox from 'Util/LightBox'
import ItemView from './ItemView'
import 'css/workingPane.css'
import 'css/form.css'
import 'react-table/react-table.css'

class AllItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataView: false,
      table:[],
      userNotify: {},
      itemViewData: {}
    }
    this.getAllItems = this.getAllItems.bind(this);
    this.setItemViewData = this.setItemViewData.bind(this);
  }
  
  componentDidMount() {
    this.getAllItems();
  }

  getAllItems = () => {
    Ajax.get(SetUrl() + "/getAllItems")
    .then((res) => {
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
    this.setItemViewData(itemData)
  }

  setItemViewData = (itemData) => {
    console.log('set view: ', itemData)
    this.setState({itemViewData: itemData})
  }

  closeLightBox = () => {
    this.setState({dataView: false});
  }

    render() {
      const columns = [
        {Header: 'ID', accessor: 'id', width: 30},
        {Header: 'Item', accessor: 'item'},
        {Header: 'Description', accessor: 'description'},
        {Header: 'Stock', accessor: 'instock', width: 60},
        {Header: 'Per Package', accessor: 'units', width: 80},
        {Header: 'Grocery Store', accessor: 'store'},
        {Header: 'Storage Location', accessor: 'storage'}]

      return (
        <div id="workingPane">
          <p className="formTitle">All Pantry Items</p>
            <div >
            <EB comp="ReactTable in COA">
            <ReactTable
              filterable
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {this.selectItem(rowInfo.original);}
                }
                }
              }
              data={this.state.table || []}
              columns={columns}
            />
            </EB>
            </div>
            
            <div >  
            {this.state.dataView ? (
              <div id="lightbox-container" className="lightbox-background">
              <LightBox close={this.closeLightBox} >
                <ItemView data={this.state.itemViewData} getAllItems={this.getAllItems}/>
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