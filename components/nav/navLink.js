import Link from "next/link";

const CustomNavItem = ({href,name}) => {
    return (
        <li className="nav-item">
            <Link className="nav-link" href={href}>
                <a className="nav-link">{name}< /a>
            </Link>
        </li>
    )
}
export default CustomNavItem