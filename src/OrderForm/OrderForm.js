import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,withProps,lifecycle,withHandlers} from 'recompose';
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
    showWarning,updateShowWarning,
  //PROPS
  //RECOMPOSE
    submitOrder,
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
        style={{maxWidth:isMobile?'100%':'33%'}}
        onChange={(e,value)=>updateName(value)}
      />
      <TextField
        floatingLabelText="Email"
        style={{maxWidth:isMobile?'100%':'33%'}}
        onChange={(e,value)=>updateEmail(value)}
      />
      <TextField
        floatingLabelText="Phone Number"
        style={{maxWidth:isMobile?'100%':'33%'}}
        onChange={(e,value)=>updatePhone(value)}
      />
    {showWarning && <p style={{color:'red'}}>you must provide your full name and email or phone number to place and order</p>}
    <RaisedButton label="Place Order" secondary={true} style={{color:'white',float:'right'}} onClick={()=>submitOrder(name,email,phone,generateCart())}/>
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
  withState('showWarning','updateShowWarning',false),
  connect(mapStateToProps,matchDispatchToProps),
  muiThemeable(),
  withHandlers({
    submitOrder: props => (name,email,phone,cart) => {
      if(valid('name',name) && (valid('email',email) || valid('phone',phone))){
        props.placeOrder(name,email,phone,cart)
      }else{
        props.updateShowWarning(true)
      }
    },
  })
  //withState('activeTab','updateActiveTab','search')
)(COMPONENT_NAME)

function valid(validationType,value){
  //console.log('Validating validationType='+validationType+" value="+value);
  switch (validationType) {
    case 'email':
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var passFail = re.test(String(value).toLowerCase());
      //console.log('Validation for email is '+String(passFail));
      return passFail
    case 'phone':
      var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      var passFail = re.test(String(value).toLowerCase());
      //console.log('Validation for phone is '+String(passFail));
      return passFail
    case 'name':
      var passFail = value.length > 2
      //console.log('Validation for name is '+String(passFail));
      return passFail
    default:
      //console.log('Default Fail');
      return false;

  }

}
