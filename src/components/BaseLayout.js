import React, { Component} from 'react'
import Navigation from './Navigation'

export function Footer() {
    return (
        <div>
            Footer
        </div>
    )
}

export class BaseLayout extends Component {
    render() {
        return (
            <div>
                <Navigation />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}