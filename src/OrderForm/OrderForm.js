import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,withProps,lifecycle} from 'recompose';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
//COMPONENTS//
  import TextField from 'material-ui/TextField';
  import RaisedButton from 'material-ui/RaisedButton';
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
    <div style={{width:'100%'}}>
      <TextField
        floatingLabelText="Name"
        style={{maxWidth:'33%'}}
      />
      <TextField
        floatingLabelText="Email"
        style={{maxWidth:'33%'}}
      />
      <TextField
        floatingLabelText="Phone Number"
        style={{maxWidth:'33%'}}
      />
      <RaisedButton label="Place Order" secondary={true} style={{color:'white',float:'right'}}/>
    </div>
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
