import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,withProps,lifecycle} from 'recompose';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
//COMPONENTS//
  import SelectField from 'material-ui/SelectField';
  import MenuItem from 'material-ui/MenuItem';
  import {Row,Col} from 'react-bootstrap'
  import Drawer from 'material-ui/Drawer';
  import FA from 'react-fontawesome'
  import Badge from 'material-ui/Badge';
  import {Animated} from "react-animated-css";

  import CategoriesSidebar from './CategoriesSidebar'
  import ProductsGrid from './ProductsGrid'
  import Cart from './Cart'
//ACTIONS//
  import {updateCategories} from 'Actions/Categories'
//HOC//
  import Loading from 'HOC/Loading'
  import Mobile from 'HOC/mobile'
//STYLE
  import './style.css'
const COMPONENT_NAME = ({
  //REDUX
    categories,
  //STATE
    isCartOpen,updateIsCartOpen,
    category,updateCategory,
    isCartAnimated,animateCart,
  //PROPS
    cart,
  //OTHER
  muiTheme,isMobile,...props
})=> {
  function getTotalCartQuantity(){
    var totalQuantity=0;
    cart.data.map((item)=>totalQuantity+=item.quantity)
    return totalQuantity
  }
  return (
    <div style={{overflow:'hidden'}}>
      <div style={{width:'20%',height:'500px',position:'absolute',top:100,left:0}}>
        <CategoriesSidebar onChange={(selectedCategory)=>{updateCategory(selectedCategory)}}/>
      </div>
      <div style={{width:'80%',height:'500px',position:'absolute',top:100,left:'20%'}}>
        <ProductsGrid category={category?category:categories.data[0]} onCartAdd={()=>animateCart(!isCartAnimated)}/>
      </div>
      <div onClick={()=>updateIsCartOpen(true)} style={{position:'absolute',right:5,top:5,zIndex:1}}>
        <Animated animationIn="rubberBand" animationOut="jello" isVisible={isCartAnimated}>
          <Badge
            badgeContent={getTotalCartQuantity()}
            primary={true}
          >
            <FA name='shopping-cart' size='4x'/>
          </Badge>
        </Animated>
      </div>
      <Drawer width={window.innerWidth*.8} openSecondary={true} open={isCartOpen} >
        <FA name='times' size='4x' style={{position:'absolute',right:5,top:5,zIndex:1,cursor:'pointer'}} onClick={()=>updateIsCartOpen(false)}/>
        <div style={{width:'100%',position:'absolute',top:20,left:0}}><Cart/></div>
      </Drawer>
    </div>
  )
}

const mapStateToProps = state => ({
  categories:state.categories,
  cart:state.cart,
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    updateCategories:updateCategories,
  },dispatch)
}

export default compose(
  Mobile(),
  withState('isCartAnimated','animateCart',false),
  withState('isCartOpen','updateIsCartOpen',false),
  withState('category','updateCategory',null),
  connect(mapStateToProps,matchDispatchToProps),
  withProps(props=>{return{loading:false}}),
  lifecycle({
    componentDidMount(){
      this.props.updateCategories()
    }
  }),
  muiThemeable(),
  //withState('activeTab','updateActiveTab','search')
)(COMPONENT_NAME)
