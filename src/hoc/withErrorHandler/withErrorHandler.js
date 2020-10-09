import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

//We are setting up a global error handling.
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        UNSAFE_componentWillMount () {

            //Before whatever request we want to go back to a state where => error: null.
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;  //Because we want to continue with the request
            });

            //We are worrying only is we have an error, in this case we change the state of error. Besides, we need to return the response in the good statement as well, in order to continue with the local response.
            this.resInterceptor = axios.interceptors.response.use(res => res, error =>{
                this.setState({error: error})
            });
        }

        //We are ejecting the interceptors when the WrapperElement is unmounted. Because we don't want to have all the interceptors active when we are in another react webpage that uses only a couple of interceptors.
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler} >
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;