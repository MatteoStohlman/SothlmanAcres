import React from 'react';
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import {withState,compose} from 'recompose'
import PropTypes from 'prop-types';
import moment from 'moment'
import muiThemeable from 'material-ui/styles/muiThemeable';

//COMPONENTS//
  import TextField from 'material-ui/TextField';
  import RaisedButton from 'material-ui/RaisedButton';
//ACTIONS//
  import {setOutlet} from './actions'



const COMPONENT_NAME = ({
  //PROPS FROM PARENT//

  //REDUX//
    setOutlet,
  //STATE
    room1Temp,updateRoom1Temp,room1Humid,updateRoom1Humid,room2Temp,updateRoom2Temp,room2Humid,updateRoom2Humid,
  //OTHER
  muiTheme
}) => {
    return (
      <div>
        <RaisedButton
          primary={true}
          label={room1Humid?"Turn Off Humidifier":'Turn On Humidifier'}
          onClick={()=>{
              setOutlet(1,'humid',!room1Humid);
              updateRoom1Humid(!room1Humid);
          }}
        />
        <br/><br/>
        <RaisedButton
          primary={true}
          label={room1Temp?"Turn Off AC":'Turn On AC'}
          onClick={()=>{
              setOutlet(1,'temp',!room1Temp);
              updateRoom1Temp(!room1Temp);
          }}
        />
      </div>
    )
}

COMPONENT_NAME.propTypes={
  //label:PropTypes.string.isRequired
}

const mapStateToProps = state => ({
})

function matchDispatchToProps(dispatch){
  return  bindActionCreators({
      setOutlet:setOutlet,
  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  muiThemeable(),
  withState('room1Temp','updateRoom1Temp',false),
  withState('room1Humid','updateRoom1Humid',false),
  withState('room2Temp','updateRoom2Temp',false),
  withState('room2Humid','updateRoom2Humid',false),
)(COMPONENT_NAME)
