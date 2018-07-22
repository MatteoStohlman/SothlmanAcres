import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,withProps,lifecycle} from 'recompose';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {getProductEntity} from 'Static/utils'
//COMPONENTS//
  import ReactTable from 'react-table'
//ACTIONS//
  import {updateCategories} from 'Actions/Categories'
//HOC//
  import Loading from 'HOC/Loading'
  import Mobile from 'HOC/mobile'
//STYLE
  import './style.css'
const COMPONENT_NAME = ({
  //REDUX
    cart,products,categories,
  //STATE

  //PROPS

  //OTHER
  muiTheme,isMobile,...props
})=> {

  function generateData(){
    if(!cart.data.length)return []
    return cart.data.map((item)=>{
      var product = getProductEntity(item.productId,products)
      console.log(product);
      return{
        product:product.name,
        quantity:item.quantity,
        unitPrice:product.price,
        totalPrice:item.quantity*product.price,
      }
    })
  }
  const columns=[
    {
      Header: 'Product',
      accessor: 'product',
    },{
      Header: 'Quantity',
      accessor: 'quantity',
    },{
      Header: 'Unit Price',
      accessor: 'unitPrice',
    },{
      Header: 'Total Price',
      accessor: 'totalPrice',
    }
  ]
  return (
    <ReactTable
      data={generateData()}
      columns={columns}
      showPagination={false}
      noDataText={'no items in your cart'}
      className="-striped -highlight"
      defaultPageSize={20}
      style={{
        height: "300px" // This will force the table body to overflow and scroll, since there is not enough room
      }}
    />
  )
}

const mapStateToProps = state => ({
  cart:state.cart,
  products:state.products,
  categories:state.categories,
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
  },dispatch)
}

export default compose(
  Mobile(),
  connect(mapStateToProps,matchDispatchToProps),
  muiThemeable(),
  //withState('activeTab','updateActiveTab','search')
)(COMPONENT_NAME)
