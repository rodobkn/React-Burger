import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

class Checkout extends Component {

    // state = {
    //     ingredients: null,
    //     totalPrice: 0
    // }

    // UNSAFE_componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);  //new URLSearchParams() will sort the http query in this way:  "?salad=1&bacon=2" -> [['salad', '1'], ['bacon', '2']]
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {     //you need to add entries() to obtain the parsed data
    //         // param -> ['salad', '1']
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];   //we use the '+' because we want to transform the string number into a int.
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }


    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data'); //We are replacing the current route for a new one. Then obviously we will be redirected to the webpage referenced by this new route
    }

    render () {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                    ingredients={this.props.ings} 
                    checkoutCancelled={this.checkoutCancelledHandler} 
                    checkoutContinued={this.checkoutContinuedHandler} />
                
                    <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />
                </div>
            );
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};



export default connect(mapStateToProps)(Checkout);

