import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,withProps,lifecycle} from 'recompose';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {getProductName,getCategoryName} from 'Static/utils'
//COMPONENTS//
  import TextField from 'material-ui/TextField';
  import RaisedButton from 'material-ui/RaisedButton';
  import FA from 'react-fontawesome'
//ACTIONS//
  import {placeOrder} from 'Actions/Cart'
//HOC//
  import Loading from 'HOC/Loading'
  import Mobile from 'HOC/mobile'
//STYLE
  import './style.css'
const COMPONENT_NAME = ({
  //REDUX
    cart,products,categories,
    placeOrder,
  //STATE
  name,updateName,
  email,updateEmail,
  phone,updatePhone,
  //PROPS

  //OTHER
  muiTheme,isMobile,...props
})=> {
  function generateCart(){
    return cart.data.map((item)=>{
      return{
        ...item,
        productName:getProductName(item.productId,products),
        categoryName:getProductName(item.categoryId,categories)
      }
    })
  }
  if(cart.requesting){
    return(
      <div style={{width:'100%',textAlign:'center',height:250}}>
        <FA name='spinner' spin={true} size='5x'/>
      </div>
    )
  }
  return (
    <div style={{width:'100%'}}>
      <TextField
        floatingLabelText="Name"
        style={{maxWidth:'33%'}}
        onChange={(e,value)=>updateName(value)}
      />
      <TextField
        floatingLabelText="Email"
        style={{maxWidth:'33%'}}
        onChange={(e,value)=>updateEmail(value)}
      />
      <TextField
        floatingLabelText="Phone Number"
        style={{maxWidth:'33%'}}
        onChange={(e,value)=>updatePhone(value)}
      />
    <RaisedButton label="Place Order" secondary={true} style={{color:'white',float:'right'}} onClick={()=>placeOrder(name,email,phone,generateCart())}/>
    </div>
  )
}

const mapStateToProps = state => ({
  cart:state.cart,
  categories:state.categories,
  products:state.products,
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    placeOrder:placeOrder,
  },dispatch)
}

export default compose(
  Mobile(),
  withState('name','updateName',false),
  withState('email','updateEmail',false),
  withState('phone','updatePhone',false),
  connect(mapStateToProps,matchDispatchToProps),
  muiThemeable(),
  //withState('activeTab','updateActiveTab','search')
)(COMPONENT_NAME)
