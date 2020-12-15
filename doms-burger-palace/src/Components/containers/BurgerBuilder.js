import React, { Component } from 'react'
import { connect } from 'react-redux'
import Aux from '../../hoc/Aux'
import Burger from '../Burger/Burger'
import BuildControls from '../Burger/BuildControls/BuildControls'
import Modal from '../UI/Modal/Modal'
import OrderSummary from '../Burger/OrderSummary/OrderSummary'
// axios for firebase
import axios from '../../axios-orders'
import Spinner from '../UI/Spinner/Spinner'
// used to catch errors 
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as burgerBuilderActions from '../../store/actions/index'



class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        // console.log(this.props)
        // axios.get('https://dom-s-burger-palace-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     })
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

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type]
    //     const updatedCount = oldCount + 1
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount
    //     const priceAddition = INGREDIENT_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice + priceAddition
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients)
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type]
    //     if(oldCount <= 0) {
    //         return
    //     }
    //     const updatedCount = oldCount - 1
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount
    //     const priceDeduction = INGREDIENT_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice - priceDeduction
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients)
    // }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
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
        
        
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        
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
        if (this.state.loading) {
            orderSummary = <Spinner />
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
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName))
    }
}

// export default BurgerBuilder

// used to catch any errors
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder)