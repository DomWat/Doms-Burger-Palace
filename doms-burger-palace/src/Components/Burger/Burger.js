import React from 'react'
import classes from './Burger.module.css'
import Burgering from './BurgerIng/BurgerIng'

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
        // the 'props' is an object and this will turn it into an arry so we can map it
        .map(igKey => {
            // uses the key of the object for the items (ie..cheese, lettuce)
            // uses the value (number of items) in order to determine if their is 1 or more
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <Burgering key = {igKey + i} type = {igKey} />
            })
        })
        // will 'reduce' the multiple arrays into just 1
        .reduce((arr, el) => {
            return arr.concat(el)
        }, [])
        if(transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start adding ingredients!</p>
        }

    



    return(
        <div className = {classes.Burger}>
            <Burgering type = 'bread-top' />
            {transformedIngredients}
            <Burgering type = 'bread-bottom' />
        </div>
    )
}

export default burger