import React from 'react'
import Burger from '../../Burger/Burger'
// import button from '../../UI/Button/Button.module.css'
import classes from './CheckoutSummary.module.css'
import Button from '../../UI/Button/Button'

const checkoutSummary = (props) => {
    return(
        <div className = {classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style = {{width: '100%', margin: 'auto'}}>
                <Burger ingredients = {props.ingredients}/>
            </div>
            <Button 
                btnType = 'Danger'
                clicked = {props.checkoutCancelled}>CANCEL</Button>
            <Button 
                btnType = 'Success'
                clicked = {props.checkoutContinued}>CONTINUE</Button>
            {/* <button 
                className = {button.Danger}
                onClick>Cancel</button>
            <button 
                className = {button.Success}
                onClick>Continue</button> */}
        </div>
    )
}

export default checkoutSummary 