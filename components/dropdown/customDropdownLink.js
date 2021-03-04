import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
        &#x25bc;
    </a>
));

const CustomDropdownLink = ({children, name}) => (
    <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            {name}
        </Dropdown.Toggle>

        {children}
    </Dropdown>
);

export default CustomDropdownLink