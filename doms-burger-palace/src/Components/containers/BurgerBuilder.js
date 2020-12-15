import React, { Component } from 'react'
import { connect } from 'react-redux'
import Aux from '../../hoc/Aux'
import Burger from '../Burger/Burger'
import BuildControls from '../Burger/BuildControls/BuildControls'
import Modal from '../UI/Modal/Modal'
import OrderSummary from '../Burger/OrderSummary/OrderSummary'

import Spinner from '../UI/Spinner/Spinner'
// used to catch errors 
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'



class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount () {
        // console.log(this.props)
        this.props.onInitIngredients()
        
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null
        
        
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        
        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings}/>
                    <BuildControls 
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientRemoved = {this.props.onIngredientRemoved}
                        disabled = {disabledInfo} 
                        purchasable = {this.updatePurchaseState(this.props.ings)}
                        ordered = {this.purchaseHandler}
                        price = {this.props.price} />
                </Aux>
                )
                orderSummary = <OrderSummary 
                    purchaseContinued = {this.purchaseContinueHandler}
                    purchaseCanceled = {this.purchaseCancelHandler}
                    ingredients = {this.props.ings} 
                    price = {this.props.price}/>
        }
        
        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.puchaseInit())
    }
}

// export default BurgerBuilder

// used to catch any errors
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder)