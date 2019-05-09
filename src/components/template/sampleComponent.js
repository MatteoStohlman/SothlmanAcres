import React from 'react';
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import {withState,compose} from 'recompose'
import PropTypes from 'prop-types';
import moment from 'moment'
import muiThemeable from 'material-ui/styles/muiThemeable';

//COMPONENTS//
  import TextField from 'material-ui/TextField';

//ACTIONS//




const COMPONENT_NAME = ({
  //PROPS FROM PARENT//
  label='Test',
  //REDUX//

  //STATE

  //OTHER
  muiTheme
}) => {
    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
      />
    )
}

COMPONENT_NAME.propTypes={
  //label:PropTypes.string.isRequired
}

const mapStateToProps = state => ({
})

function matchDispatchToProps(dispatch){
  return  bindActionCreators({
  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  muiThemeable(),
  //withState('showSearchbox','toggleSearchbox',true)
)(COMPONENT_NAME)
