import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    //Object.keys() -> transform an object into in array wich contains only the keys of the object.
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {     //With map we grab all the elements of the array. Each time the new element is named igKey. Then we modify the current value for the value returned
        //Array(3) -> create a new array like that -> [ , , ]
        return [...Array(props.ingredients[igKey])].map((_, i) => {      //We don't care about the element itself, because is a blank space, but we take care about the positions which are called 'i'. You need to remember that if we return an array of JSX code, we need to create a unique key for every element.
            return <BurgerIngredient key={igKey + i} type={igKey} />;
        });
    }).reduce((arr, el) => {         //Reduce is to transform an array into something else. In this case we will iterate for each element(a element here is an array of the same ingredient), and then we will concatenate all the arrays into only one array. For example [[1,2], ['hola', 'chao']] -> [1,2,'hola','chao']
        return arr.concat(el);        // arr is the previous element. el is the current element. In the first iteration, arr is the initial value that set up and el is the first element.
    }, []);  //Here we set up the initial value. In this case is a empty array []

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }    

    return (
        <div className={classes.Burger} >
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;