import React from 'react';
import ListItem from './ListItem/ListItem';
import classes from './ListItems.css';

const listItems = ( props ) => {
    
    return(
        <div className={classes.ContainerCharacters}>    
            
            <div className={classes.Header}>
                <div className={classes.Heading}>
                    {props.heading}
                </div>

                {props.rows.length?
                    <div className={classes.Navigation}>
                        {props.page!=1?
                            <div className = {classes.NavigationIcon} onClick={ props.prevClicked} >
                                &#60;
                            </div>
                            :
                            <div className = {classes.NavigationIconDisabled} >
                                &#60;
                            </div>
                        }
                        <div>
                            <strong>Page {props.page}</strong>
                        </div>
                        {props.totalCharacters.length>props.page*10?
                            <div className = {classes.NavigationIcon} onClick={ props.nextClicked} >
                                &#62;
                            </div>
                            : 
                            <div className = {classes.NavigationIconDisabled} >
                                &#62;
                            </div>
                        }
                    </div>
                    :
                    null
                }
            </div>

            {props.rows.map((row, index) => {
                return(<ListItem key = {row.char_id} row = {row} clicked = {() => props.rowClicked(index)} />);
            })
            }

            {props.rows.length?
                <div className={classes.Footer}>
                    <div className={classes.Navigation}>
                        {props.page!=1?
                            <div className = {classes.NavigationIcon} onClick={ props.prevClicked} >
                                &#60;
                            </div>
                            :
                            <div className = {classes.NavigationIconDisabled} >
                                &#60;
                            </div>
                        }
                        <div>
                            <strong>Page {props.page}</strong>
                        </div>
                        {props.totalCharacters.length>props.page*10?
                            <div className = {classes.NavigationIcon} onClick={ props.nextClicked} >
                                &#62;
                            </div>
                            : 
                            <div className = {classes.NavigationIconDisabled} >
                                &#62;
                            </div>
                        }
                    </div>
                </div>
                :
                null
            }

        </div>
    )
};

export default listItems;