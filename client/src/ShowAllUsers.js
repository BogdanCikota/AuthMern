import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import axios from 'axios';

const ShowAllUsers = () => {
    const { windowUrl, url } = useContext(GlobalContext);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        axios({
            method: 'get',
            withCredentials: true,
            url: url + '/users'
        })
            .then(res => {
                setUsers([...res.data]);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [url]);

    const deleteUser = (id) => {

        axios({
            method: 'delete',
            withCredentials: true,
            url: url + `/users/${id}/delete`
        })
            .then(res => {
                console.log(res.data);
                window.open(windowUrl, '_self');
            })
            .catch((err) => {
                console.log(err);
            })
    };

    return (
        <div className="show-all-users">
            <h3>User list</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">user email</th>
                        <th scope="col" className="delete-user">delete user</th>
                    </tr>
                </thead>
                <tbody>

                    {users && users.map(user => {
                        return <tr key={user._id}>

                            {
                                (user._id !== '60545c0af5550243a03bbdbf') &&
                                <td>{user.username}</td>
                            }
                            {
                                (user._id !== '60545c0af5550243a03bbdbf') &&
                                <td id={user._id} className="btn btn-primary delete-user-btn" onClick={(e) => { deleteUser(e.target.id) }}>delete</td>
                            }
                        </tr>
                    })}

                </tbody>
            </table>
        </div>
    );
}

export default ShowAllUsers;