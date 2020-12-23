import React, { Component } from 'react';
import classes from './Character.css';
import axios from 'axios';
import config from '../../config.json';

class Character extends Component {

    state = {
        character: {},
        quotes: []
    }

    componentDidMount () {
        axios.get(config.END_POINT+"quote?author=" + this.props.location.state.name.split(' ').join('+'))
        .then(response => {
            console.log(response);
            
            let quotes = [];

            response.data.forEach (ele => {
                quotes.push(ele.quote);
            });

            this.setState({character: this.props.location.state, quotes: quotes});
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        // console.log (this.state.character);
        // console.log (this.state.quotes);

        return (
            <div className={classes.ContainerCharacter}>
            
                <div className={classes.Name}>
                    {this.state.character.name}
                </div>
                
                <img className={classes.Image} src={this.state.character.img} alt="character-image" />  
                
                <div className={classes.Birthday}>
                    <strong>DOB: </strong> {this.state.character.birthday}
                </div>
                
                {this.state.character.occupation? this.state.character.occupation.map((ele, index) => {
                    return (
                        <div key = {index} className={classes.Occupation}>
                            {ele}
                        </div>
                    )}) 
                    : 
                    null
                }
                
                <div className={classes.Status}>
                    {this.state.character.status}
                </div>

                {this.state.character.nickname? 
                    <div className={classes.Nickname}>
                        <strong>Nickname: </strong>{this.state.character.nickname}
                    </div>
                    : 
                    null
                }
                            
                <div className={classes.Portrayed}>
                    <strong>Portrayed By: </strong>{this.state.character.portrayed}
                </div>

                {this.state.character.appearance?         
                    <div className={classes.Seasons}>
                        <strong>Seasons Appeared In: </strong> {this.state.character.appearance.join(', ')}
                    </div>
                    :
                    null
                }
                
                {this.state.quotes.length? 
                    <div>
                        <div className={classes.QuotesHeading}>Quotes: </div>
                        <ul>
                            {this.state.quotes.map((quote, index) => {
                            return (
                                <li className={classes.Quote} key = {index}>
                                    "{quote}"
                                </li>
                            )})}
                        </ul>
                    </div>
                    : 
                    null 
                }
        
            </div>
        );
    }
    
};

export default Character;