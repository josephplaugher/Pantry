import React from 'react'
import { Button } from 'reactform-appco'
import Ajax from 'Util/Ajax'
import ReactTable from 'react-table'
import EB from 'Util/EB'
import SetUrl from 'Util/SetUrl'
import LightBox from 'Util/LightBox'
import ShoppingMenu from './ShoppingMenu'
import 'css/workingPane.css'
import 'css/form.css'
import 'react-table/react-table.css'

class ShoppingList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataView: false,
      table: [],
      currentList: [],
      userNotify: {},
      currentItem: {}
    }
    this.getAllItems = this.getAllItems.bind(this);
    this.remove = this.remove.bind(this);
    this.markPurchased = this.markPurchased.bind(this);
    this.saveForLater = this.saveForLater.bind(this);
  }

  componentDidMount() {
    this.getAllItems();
  }

  getAllItems = () => {
    Ajax.get(SetUrl() + "/getAllItems")
      .then(res => {
        this.setState({
          table: res.data.table,
          currentList: res.data.table
        })
      })
  }

  selectItem = (row) => {
    this.setState({
      currentItem: row, 
      dataView: true
    })
  }

  markPurchased = (currentItem) => {
    Ajax.get(SetUrl() + "/markPurchased/" + currentItem.id)
      .then(() => {
        this.getAllItems()
      })
  }

  saveForLater = (currentItem) => {
    const oldList = this.state.table;
    const newList = []
    var i = 0
    for(i=0; i < oldList.length; i++) {
      if(oldList[i].id !== currentItem.id) {
        newList.push(oldList[i])
      }
    }
    this.setState({currentList:newList})
    this.closeLightBox()    
  }

  remove = (event) => {
    console.log('remove', event)
  }

  closeLightBox = () => {
    this.setState({ dataView: false });
  }


  render() {
    const columns = [
      { Header: 'ID', accessor: 'id', width: 30 },
      { Header: 'Item', accessor: 'item' },
      { Header: 'Grocery Store', accessor: 'store' },
      { Header: 'In-Store Location', accessor: 'instore_location' }
    ]


    return (
      <div id="workingPane">
        <p className="formTitle">Shopping List</p>
        <EB comp="ReactTable in COA">
          <ReactTable filterable
            getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: (e, handleOriginal) => { this.selectItem(rowInfo.original); }
              }
            }
            }
            data={this.state.currentList}
            columns={columns}
          />
        </EB>
        <EB comp="lightbox in shopping list" >
          {this.state.dataView ? (
            <div id="lightbox-container" className="lightbox-background">
              <LightBox close={this.closeLightBox} >
                <ShoppingMenu currentItem={this.state.currentItem} 
                    saveForLater={this.saveForLater}
                    remove={this.remove} 
                    markPurchased={this.markPurchased}
                />
              </LightBox>
            </div>
          ) : (
              null
            )}
        </EB>  
        </div>
        )
      }
  }
  
export default ShoppingList;