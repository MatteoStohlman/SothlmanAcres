import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,withProps,lifecycle,withPropsOnChange} from 'recompose';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import getUnitName from 'Static/units'
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
    products,
  //STATE
    activeProductId,updateActiveProductId,
  //PROPS
    category,
  //OTHER
  muiTheme,isMobile,...props
})=> {
  function createTiles(){
    if(!products.data.length){return []}
    var categoryProducts = products.data.filter((prod)=>prod['belongs-to-category']==category._id)
    var tiles =  categoryProducts.map((prod,index)=>{
      if(category && prod['belongs-to-category']==category._id){
        return {
          id:prod._id,
          img:prod['main-image'].url,
          title:prod.name,
          price:"$"+prod.price+" /"+getUnitName(prod['unit-2']),
          description:prod.description,
          featured:categoryProducts.length<=2
        }
      }
    })
    console.log(products,tiles);
    return tiles
  }
  if(!products.data.length || !category)return(null)
  return (
    <div>
      <GridList
        cols={3}
        cellHeight={200}
        padding={5}
        style={styles.gridList}
      >
        {createTiles().map((tile) => (
          <GridTile
            key={tile.img}
            title={<span>{tile.title} <FA className='addToCartIcon' name='cart-plus'/></span>}
            subtitle={<span>{tile.price}</span>}
            actionPosition="left"
            titlePosition="top"
            titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            cols={tile.featured ? 2 : 1}
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
                    zIndex:1,
                    color:'white',
                    padding:3,
                    background:'linear-gradient(rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4)',
                    transition: 'all 0.5s ease'
                  }}
                >
                  {tile.description}
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
  products:state.products
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    updateProducts:updateProducts,
  },dispatch)
}

export default compose(
  Mobile(),
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
