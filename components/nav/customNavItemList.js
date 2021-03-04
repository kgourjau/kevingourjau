import CustomNavItem from './customNavItem.js'

const CustomNavItemList = ({navItems}) => {
    return (
        navItems.map((item,key) => <CustomNavItem href={item.href} name={item.name} key={key}/>)
    )
}
export default CustomNavItemList