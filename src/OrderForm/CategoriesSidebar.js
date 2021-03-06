import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,withProps,lifecycle} from 'recompose';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
//COMPONENTS//
  import SelectField from 'material-ui/SelectField';
  import MenuItem from 'material-ui/MenuItem';
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
    onChange,
  //OTHER
  muiTheme,isMobile,...props
})=> {
  return (
    <div style={{width:'100%',height:'100vh',}}>
      {categories.data.length &&
        categories.data.map((cat,index)=>{
          if(!cat.isactive){return null}
          var isSelected = category?(category._id==cat._id?true:false):(index==0?true:false)
          return(
              <div
                style={{padding:10}}
              >
                <div
                  className={'icon '+(isSelected?'selected':'')}
                  style={{
                    backgroundImage:'url('+cat.icon.url+')',
                  }}
                  onClick={()=>{onChange(cat);updateCategory(cat)}}
                >

                </div>
              </div>
          )
        })
      }
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
  Loading,
  withProps(props=>{return{loading:false}}),
  lifecycle({
    componentDidMount(){
      this.props.updateCategories()
    }
  }),
  muiThemeable(),
  //withState('activeTab','updateActiveTab','search')
)(COMPONENT_NAME)
