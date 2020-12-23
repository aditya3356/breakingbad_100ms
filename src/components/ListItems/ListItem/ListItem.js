import React from 'react';
import classes from './ListItem.css';

const listItem = ( props ) => {
    return(
        <div className={classes.ListItem} onClick={props.clicked}>
            
            <div className={classes.CharacterDetails}>
                <div className={classes.Name}>
                    {props.row.name}
                </div>
                
                <div className={classes.OccupationsList}>
                {props.row.occupation.map((ele, index) => {
                    return (
                        <div key = {index} className={classes.Occupation}>
                            {ele}
                        </div>
                    )
                })}
                </div>

            </div>

            <div className={classes.CharacterStatus}>
                <div className={classes.Birthday}>
                    <strong>DOB: </strong>
                    {props.row.birthday}
                </div>
                <div className={classes.Status}>
                    <em>{props.row.status}</em>
                </div>
            </div>

        </div>
    )
};

export default listItem;