import React, { Component } from 'react'
import BurgerBuilder from './Components/containers/BurgerBuilder'
import Layout from './Components/Layout/Layout'
import Checkout from './Components/containers/Checkout/Checkout'
import { Route, Switch } from 'react-router-dom'
import Orders from './Components/containers/Orders/Orders'


class App extends Component {
  render() {
    return(
      <div>
        <Layout>
          <Switch>
            <Route path = '/checkout' component = {Checkout} />
            <Route path = '/orders' component = {Orders} />
            <Route path = '/' exact component = {BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default App