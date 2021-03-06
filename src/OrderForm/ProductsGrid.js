import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,withProps,lifecycle,withPropsOnChange} from 'recompose';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import getUnitName from 'Static/units'
import moment from 'moment'
import {formatCurrency} from 'Static/formats'
//COMPONENTS//
  import SelectField from 'material-ui/SelectField';
  import MenuItem from 'material-ui/MenuItem';
  import {Row,Col} from 'react-bootstrap'
  import {GridList, GridTile} from 'material-ui/GridList';
  import IconButton from 'material-ui/IconButton';
  import FA from 'react-fontawesome'
  import SvgIcon from 'material-ui/SvgIcon';
//ACTIONS//
  import {updateProducts} from 'Actions/Products'
  import {addToCart} from 'Actions/Cart'
//HOC//
  import Loading from 'HOC/Loading'
  import Mobile from 'HOC/mobile'
//STYLE
  import './style.css'
  const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      width: '100%',
      height: '100%',
      overflowY: 'auto',
    },
  };
const COMPONENT_NAME = ({
  //REDUX
    products,categories,
    addToCart,
  //STATE
    activeProductId,updateActiveProductId,
    animatedIcon,updateAnimatedIcon,
  //PROPS
    category,onCartAdd,
  //OTHER
  muiTheme,isMobile,...props
})=> {
  function createTiles(){
    var targetCatId = false;
    if(!products.data.length){
      targetCatId='5b5282cdeadb5885f2b7c55a'
    }else{
      targetCatId = category._id
    }
    var categoryProducts = products.data.filter((prod)=>{
      if(prod['belongs-to-category']==category._id){
      }
      return prod['belongs-to-category']==category._id
    })
    var tiles =  categoryProducts.map((prod,index)=>{
      if(category && prod['belongs-to-category']==category._id){
        return {
          id:prod._id,
          img:prod['main-image'].url,
          title:prod.name,
          price:formatCurrency(prod.price)+" /"+getUnitName(prod['unit-2']),
          description:prod.description,
          featured:categoryProducts.length<=2,
          product:prod,
          availabilityDate:prod['availability-date']?prod['availability-date']:false,
          byOrderOnly:prod['is-this-product-by-order-only']?prod['is-this-product-by-order-only']:false,
          outOfStock:prod['out-of-stock']?prod['out-of-stock']:false,
        }
      }
    })
    return tiles
  }
  if(!products.data.length || !category)return(null)
  var tiles = createTiles();
  return (
    <div>
      <GridList
        cols={isMobile?2:4}
        cellHeight={isMobile?150:200}
        padding={5}
        style={styles.gridList}
      >
        {tiles.map((tile) => (
          <GridTile
            key={tile.id}
            title={
                <span onClick={()=>{
                    if(!tile.outOfStock){
                      addToCart(tile.id,category._id,1);onCartAdd();updateAnimatedIcon(tile.id)
                    }
                  }}>
                  {tile.title}
                  <FA className={"addToCartIcon "+(tile.id==animatedIcon?'slideRightAndReset':'')} size='2x' name='cart-plus' style={{position:'absolute',right:5,top:5}}/>
                </span>
            }
            subtitle={<span>{tile.price}</span>}
            actionPosition="left"
            titlePosition="top"
            titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            cols={tile.featured ? 4 : 1}
            rows={tile.featured ? 2 : 1}
            onMouseEnter={()=>updateActiveProductId(tile.id)}
            onMouseLeave={()=>updateActiveProductId(false)}
          >
            <span>
              {activeProductId==tile.id &&
                <span
                  style={{
                    position:'absolute',
                    bottom:0,
                    width:'100%',
                    zIndex:2,
                    color:'white',
                    padding:3,
                    background:'linear-gradient(rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5)',
                    transition: 'all 0.5s ease'
                  }}
                >
                  {tile.description}
                </span>
              }
              {(tile.availabilityDate || tile.byOrderOnly || tile.outOfStock) &&
                <span style={{position:'absolute',bottom:0,width:'100%',zIndex:1,backgroundColor:'#CD4250',fontWeight:'bold',paddingLeft:10,paddingRight:10}}>
                  {tile. availabilityDate &&
                    <span style={{float:'left'}}>
                      Available {moment(tile.availabilityDate).format('MM/DD')}
                    </span>
                  }
                  {tile.byOrderOnly &&
                    <span style={{float:'right',textTransform:'uppercase'}}>
                      PRE ORDER ONLY
                    </span>
                  }
                  {tile.outOfStock &&
                    <span style={{float:'left'}}>
                      Out of Stock
                    </span>
                  }
                </span>

              }
              <img src={tile.img} style={{height:'100%',transform:'translateX(-50%)',position:'relative',left:'50%'}}/>
            </span>
          </GridTile>
        ))}
      </GridList>
    </div>
  )
}

const mapStateToProps = state => ({
  products:state.products,
  categories:state.categories
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    updateProducts:updateProducts,
    addToCart:addToCart,
  },dispatch)
}

export default compose(
  Mobile(),
  withState('animatedIcon','updateAnimatedIcon',false),
  withState('activeProductId','updateActiveProductId',false),
  connect(mapStateToProps,matchDispatchToProps),
  lifecycle({
    componentDidMount(){
      this.props.updateProducts()
    }
  }),
  muiThemeable(),
  //withState('activeTab','updateActiveTab','search')
)(COMPONENT_NAME)
