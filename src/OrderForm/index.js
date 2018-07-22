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
    category,updateCategory,
  //PROPS

  //OTHER
  muiTheme,isMobile,...props
})=> {
  return (
    <Row style={{overflow:'hidden'}}>
      <div style={{width:'20%',height:'500px',position:'absolute',top:0,left:0}}><CategoriesSidebar onChange={(selectedCategory)=>updateCategory(selectedCategory)}/></div>
      <div style={{width:'80%',height:'500px',position:'absolute',top:0,left:'20%'}}><ProductsGrid category={category}/></div>
      <div style={{width:'100%',height:'300px',position:'absolute',bottom:0,left:0}}><Cart/></div>
    </Row>
  )
}

const mapStateToProps = state => ({
  categories:state.categories
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    updateCategories:updateCategories,
  },dispatch)
}

export default compose(
  Mobile(),
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
