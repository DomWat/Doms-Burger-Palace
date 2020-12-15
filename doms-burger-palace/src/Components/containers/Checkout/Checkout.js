import React, { Component } from 'react'
import CheckoutSummary from '../../../Components/Order/CheckoutSummary/CheckoutSummary'
import { Redirect, Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'

class Checkout extends Component {


    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        let test = <Redirect to = '/' />
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to = '/'/> : null
            test = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients = {this.props.ings}
                        checkoutCancelled = {this.checkoutCancelledHandler}
                        checkoutContinued = {this.checkoutContinuedHandler}/>
                    <Route 
                        path = {this.props.match.path + '/contact-data'} 
                        component={ContactData} />
            </div>
            )
        }
        return test
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout)