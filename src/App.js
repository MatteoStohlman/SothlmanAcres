//IMPORTS
  //SYSTEM
    import React, { Component } from 'react'
    import {connect} from 'react-redux';
    import {bindActionCreators} from 'redux';
    import { BrowserRouter as Router, Route } from 'react-router-dom';
    import { createBrowserHistory, createHashHistory } from 'history'
  //STYLE
  //NODE_MODULES
  //COMPONENTS
    import { configureHistory } from 'configureHistory.js'
    import OrderForm from 'OrderForm'
    import CuringRoom from 'CuringRoom'

const history = configureHistory()
class App extends Component {
  render() {
    return(
        <div>
          <Router history={history}>
            <div>
              <Route path='/' exact={true} component={OrderForm} />
              <Route path='/salumi' exact={true} component={CuringRoom}/>
            </div>
          </Router>
        </div>
    )
  }
}
function mapStateToProps(state){
  return {

  };
}

function matchDispatchToProps(dispatch){
  return  bindActionCreators({

  },dispatch)
}


export default connect(mapStateToProps,matchDispatchToProps)(App);
