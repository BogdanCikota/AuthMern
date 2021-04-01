import { Link } from 'react-router-dom';
import Admin from './Admin';
import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import axios from 'axios';

const User = () => {
    const { windowUrl, user, url, foundUser } = useContext(GlobalContext);

    const logout = () => {
        axios({
            method: 'get',
            withCredentials: true,
            url: url + '/logout'
        })
            .then(res => {
                console.log(res.data);
                window.open(windowUrl, '_self');
            });
    };

    const deleteUser = () => {

        axios({
            method: 'delete',
            withCredentials: true,
            url: url + `/users/${user.id}/delete`
        })
            .then(res => {
                console.log(res.data);
                logout();
            })
            .catch((err) => {
                console.log(err);
            })
    };

    return (
        <div>
            {
                (foundUser === true) &&
                <div className="user-page">
                    {(user.id === '60545c0af5550243a03bbdbf') ? <Admin /> :
                        <div>
                            {
                                (user.username.indexOf('@') === -1) ?
                                    <div>
                                        <h2>Hello {user.username}</h2>
                                    </div> :
                                    <div>
                                        <h2>Hello {user.username.slice(0, user.username.indexOf('@'))}</h2>
                                        <Link to={`/users/${user.id}/edit`}>change password</Link>
                                    </div>
                            }


                            <br />
                            <div className="btn btn-primary delete-my-profile" onClick={deleteUser}>deactivate my profile</div>
                        </div>
                    }

                    <div className="btn btn-primary log-out-btn" onClick={logout}>log out</div>
                </div>
            }
        </div>
    );
}

export default User;