import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,withProps,lifecycle} from 'recompose';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {getProductEntity} from 'Static/utils'
import numeral from 'numeral'
import {formatCurrency} from 'Static/formats'
//COMPONENTS//
  import ReactTable from 'react-table'
  import FA from 'react-fontawesome'
  import { InputNumber } from 'antd';
  import OrderForm from './OrderForm'
//ACTIONS//
  import {removeFromCart,updateCartItem,resetCart} from 'Actions/Cart'
//HOC//
  import Loading from 'HOC/Loading'
  import Mobile from 'HOC/mobile'
//STYLE
  import './style.css'
const COMPONENT_NAME = ({
  //REDUX
    cart,products,categories,
    removeFromCart,updateCartItem,resetCart,
  //STATE

  //PROPS

  //OTHER
  muiTheme,isMobile,...props
})=> {
  function getTotal(){
    var total=0;
    rowData.map((item)=>total+=item.totalPrice)
    return total
  }
  function generateData(){
    if(!cart.data.length)return []
    return cart.data.map((item)=>{
      var product = getProductEntity(item.productId,products)
      console.log(product);
      return{
        product:product.name,
        description:product.description,
        productId:product._id,
        quantity:item.quantity,
        unitPrice:product.price,
        totalPrice:item.quantity*product.price,
      }
    })
  }
  const columns=[
    {
      Header: 'Product',
      id: 'product',
      accessor:(row)=>
        <span>
          <b>{row.product}</b>
          <br/>
          <small>{row.description}</small>
        </span>,
      minWidth:375
    },{
      Header: 'Quantity',
      id:'quantity',
      accessor: (row)=><InputNumber min={1} max={50} value={row.quantity} onChange={(value)=>updateCartItem(row.productId,{quantity:value})} />
    },{
      Header: 'Unit $',
      id: 'unitPrice',
      maxWidth:70,
      accessor:(row)=>formatCurrency(row.unitPrice)
    },{
      Header: 'Total $',
      id: 'totalPrice',
      maxWidth:70,
      accessor:(row)=>formatCurrency(row.totalPrice)
    },{
      Header:'',
      width:22,
      id:'remove',
      accessor:(row)=><span onClick={()=>removeFromCart(row.productId)} style={{cursor:'pointer'}}><FA name='times' style={{color:'red'}}/></span>
    }
  ]
  var rowData = generateData()
  var orderTotal = getTotal()
  if(cart.orderComplete){
    return(
      <div style={{padding:60,backgroundColor:'lightgray'}}>
        <h1 style={{color:'green'}}>Order Complete!</h1>
        <p>Order Number: {cart.orderComplete}</p>
      </div>
    )
  }
  return (
    <div style={{maxWidth:'100%',marginTop:30,marginLeft:15,marginRight:15}}>
      <ReactTable
        data={generateData()}
        columns={columns}
        showPagination={false}
        noDataText={'no items in your cart'}
        className="-striped -highlight"
        pageSize={rowData.length}
        style={{marginBottom:10}}
      />
      <div style={{display:'block'}}>
        <div style={{textAlign:'right',fontSize:24,marginRight:20,width:'100%'}}>
          <span style={{fontWeight:'bold'}}>
            Total
          </span>
          <span style={{marginLeft:10}}>
            {formatCurrency(orderTotal)}
          </span>
        </div>
      </div>
      <OrderForm/>
    </div>
  )
}

const mapStateToProps = state => ({
  cart:state.cart,
  products:state.products,
  categories:state.categories,
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    removeFromCart:removeFromCart,
    updateCartItem:updateCartItem,
    resetCart:resetCart,
  },dispatch)
}

export default compose(
  Mobile(),
  connect(mapStateToProps,matchDispatchToProps),
  muiThemeable(),
  //withState('activeTab','updateActiveTab','search')
)(COMPONENT_NAME)
