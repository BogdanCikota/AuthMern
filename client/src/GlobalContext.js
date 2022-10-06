import { createContext, useEffect, useState } from "react";
import axios from 'axios';
export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [loginUsername, setLoginUserName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [user, setUser] = useState({
        username: String,
        id: String
    });
    const [foundUser, setFoundUser] = useState(false);
    const [editUsername, setEditUsername] = useState('');
    const [editPassword, setEditPassword] = useState('');

    const url = 'http://localhost:4000';
    // const url = '';

    const windowUrl = 'http://localhost:3000';
    // const windowUrl = 'http://localhost:5000';
    // const windowUrl = 'https://authmernapp.herokuapp.com';
    
    useEffect(() => {
        axios({
            method: 'get',
            withCredentials: true,
            url: url + '/users/authUser'
        })
            .then(res => {
                console.log(res.data);
                if (res.data) {
                   setUser({
                        username: res.data.username,
                        id: res.data.id
                    });
                    setFoundUser(true);
                }
                
                console.log(`found user: ${foundUser}`);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [foundUser]);

    return (
        <GlobalContext.Provider value={
            {
                signUpUsername, setSignUpUsername,
                signUpPassword, setSignUpPassword,
                loginUsername, setLoginUserName,
                loginPassword, setLoginPassword,
                url,
                user, setUser,
                foundUser, setFoundUser,
                editUsername, setEditUsername,
                editPassword, setEditPassword,
                windowUrl
            }
        }>
            {props.children}
        </GlobalContext.Provider>
    );
}

export default GlobalContextProvider;