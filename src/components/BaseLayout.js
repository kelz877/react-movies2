import React from 'react'
import Navigation from './Navigation'

export function Footer() {
    return (
        <div>
            Footer
        </div>
    )
}



export function BaseLayout(props) {
    return (
        <div>
        <Navigation />
        {props.children}
        <Footer />
    </div>
    )
}

