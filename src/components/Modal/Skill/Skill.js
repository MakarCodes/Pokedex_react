import React from 'react';

import classes from './Skill.module.scss';

const Skill = ({ statName, statValue}) => {
    return (
        <React.Fragment>
            <p className={classes.StatName}>{statName} <span className={classes.StatValue}>{statValue}</span></p>
            <div className={classes.OutsideSkillBar}>
                <div className={classes.InsideSkillBar} style={{width: `${statValue / 255 * 100}%`}}></div>
            </div>
        </React.Fragment>
    );
};

export default Skill;