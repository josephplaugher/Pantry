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

class hShoppingList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataView: false,
      table:[],
      userNotify: {},
      itemViewData: {}
    }
    this.getShoppingList = this.getShoppingList.bind(this);
  }
  
  componentDidMount() {
    this.getShoppingList();
  }

  getShoppingList = () => {
    console.log('get all')
    Ajax.get(SetUrl() + "/getShoppingList")
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
      const list = this.state.table.map((item) => 
        <div className="list-row" key={item.id}>{`${item.item}, ${item.store}, ${item.instore_location}, ${item.shoppinglist} `} 
          <input type="checkbox" onClick={() => this.markPurchased.bind(this)} />Mark Purchased
          <Button onClick={() => this.remove.bind(this)} value="Remove"/>
        </div>
      )
      return (
        <div id="workingPane">
          <p className="formTitle">All Pantry Items</p>
            <>
            <EB comp="List in shopping list">
              {list}
            </EB>
            </>
            {/*
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
            */}
            
        </div>
      )
    }
}

export default hShoppingList;