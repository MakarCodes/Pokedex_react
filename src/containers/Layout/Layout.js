import React, { Component } from 'react';

import Logo from '../../components/Logo/Logo'

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <Logo />
                {this.props.children}
            </React.Fragment>
        );
    }
}

export default Layout;