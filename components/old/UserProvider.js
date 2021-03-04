// import React, { Component } from 'react'
//
// /* First we will make a new context */
// const UserContext = React.createContext()
//
// /* Then create a provider Component */
// class UserProvider extends Component {
//     state = {
//         count: 0,
//         user: {}
//     }
//
//     increase = () => {
//         this.setState({
//             count: this.state.count + 1
//         })
//     }
//
//     decrease = () => {
//         this.setState({
//             count: this.state.count - 1
//         })
//     }
//
//     render () {
//         return (
//             <UserContext.Provider
//                 value={{
//                     count: this.state.count,
//                     increase: this.increase,
//                     decrease: this.decrease,
//                     user: this.user,
//                 }}
//             >
//                 {this.props.children}
//             </UserContext.Provider>
//         )
//     }
// }
//
// /* then make a consumer which will surface it */
// const UserConsumer = UserContext.Consumer
//
// export default UserProvider
// export { UserConsumer }


// Method 2
import {createContext} from 'react';

const UserContext = createContext();

export default function UserProvider({children}) {
    let sharedState = {
        counter: 0,
        user: {}
    }

    return (
        <UserContext.Provider value={sharedState}>
            {children}
        </UserContext.Provider>
    );
}

export const UserConsumer = UserContext.Consumer