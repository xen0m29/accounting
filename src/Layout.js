import React from 'react';
import "./App.css"

class Layout extends React.Component {
    render(){
        const { title, children } = this.props;
        return(
            <div className="container-Fluid">
                <header className="header">
                    <h6>{ title }</h6>
                </header>
                <main className="main">
                    <div className="container">
                    { children }
                    </div>
                </main>
            </div>
        );
    }
}

export default Layout;