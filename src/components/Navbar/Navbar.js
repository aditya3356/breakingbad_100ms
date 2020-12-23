import React, { Component } from 'react';
import classes from './Navbar.css';

class Navbar extends Component {

    render(){
        return(
            <div>
                <nav className={classes.Navbar}>
                    <img className={classes.Logo} src="https://i.pinimg.com/originals/71/4b/d0/714bd064cc76db83136e6fde8a1bbbe0.jpg" alt="logo image" />
                    <div className={classes.Name}>BREAKING BAD</div>
                </nav>
            </div>
        )
    }
}

export default Navbar;

