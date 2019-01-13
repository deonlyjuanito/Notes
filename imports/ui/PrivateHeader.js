import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';

export const PrivateHeader = props => {
    const navImageSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';
    return (
        <div className='header'>
            <div className='header__content'>
                <img className='header__nav-toggle' onClick={props.handleNavToggle} src={navImageSrc} />
                <h1 className='header__title'>{props.title}</h1>
                <button className='button button--link-text' onClick={() => props.handleLogout()}>
                    Log out
                </button>
            </div>
        </div>
    );
};

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
    isNavOpen: PropTypes.bool.isRequired,
    handleNavToggle: PropTypes.func.isRequired
};

export default withRouter(
    withTracker(() => {
        return {
            handleLogout: () => Accounts.logout(),
            isNavOpen: Session.get('isNavOpen'),
            handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen'))
        };
    })(PrivateHeader)
);
