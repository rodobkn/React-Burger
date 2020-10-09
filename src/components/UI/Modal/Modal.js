import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;     //We want to render this component only if the props.show change. Otherwise we are being inefficient. Remember, if you want to go to the next cycle stage, you need to return true. In this case 'this.props.show' represents the previous state. After we added another condition, but the explanatios is still valid.
    }

    componentDidUpdate () {
        console.log("[Modal] DidUpdate");
    }

    render () {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div 
                    className={classes.Modal} 
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }} >
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;