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
  console.log(category);
  if(isMobile){
    return(
      <div style={{width:'100%',height:'100%',position:'relative',backgroundColor:'#2D3E4F'}}>
        <SelectField
          floatingLabelText="What type of meat?"
          floatingLabelFixed
          value={category?category._id:categories.data.length?categories.data.filter((cat)=>cat.name=='Pork')[0]._id:null}
          menuItemStyle={{backgroundColor:'#2D3E4F',color:'white',height:50,lineHeight:'50px'}}
          menuStyle={{backgroundColor:'#2D3E4F'}}
          floatingLabelStyle={{color:'white'}}
          labelStyle={{color:'white'}}
          style={{backgroundColor:'#2D3E4F'}}
          listStyle={{backgroundColor:'#2D3E4F'}}
          onChange={(event,key,value)=>{
            var selectedCategory = categories.data.filter((cat)=>cat._id==value)[0]
            updateCategory(selectedCategory)
            onChange(selectedCategory)
          }}
        >
          {
            categories.data.length &&
              categories.data.map((cat,index)=>{
                if(!cat.isactive){return null}
                return(
                  <MenuItem key={cat.name} value={cat._id} primaryText={cat.name} />
                )
              })
          }
        </SelectField>
      </div>
    )
  }
  return (
    <div style={{width:'100%',height:'100%',position:'relative',backgroundColor:'#2D3E4F'}}>
      {categories.data.length &&
        categories.data.map((cat,index)=>{
          if(!cat.isactive){return null}
          var isSelected = category?(category._id==cat._id?true:false):(index==0?true:false)
          return(
              <div
                style={{display:'inline-block',height:'100%',position:'relative',marginRight:5}}
                className={'iconWrapper '+(isSelected?'selected':'')}
              >
                <div
                  className={'icon inline'}
                  style={{
                    backgroundImage:'url('+cat.icon.url+')',
                  }}
                  onClick={()=>{onChange(cat);updateCategory(cat)}}
                >
                <p style={{textTransform:'uppercase',marginBottom:0,fontWeight:'bold',width:'100%',left:0,textAlign:'center',position:'absolute',bottom:0}}>{cat.name}</p>
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
