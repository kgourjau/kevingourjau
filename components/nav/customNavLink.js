import {NavHashLink as NavLink} from 'react-router-hash-link';

const navigationItem = props => {
    return (
        <li>
            <NavLink
                smooth
                to={props.link}
                exact={props.exact}
            >
                {props.children}
            </NavLink>
        </li>
    )
};

export default navigationItem