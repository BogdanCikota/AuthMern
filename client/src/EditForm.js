import { GlobalContext } from "./GlobalContext";
import { useContext } from "react";
import axios from "axios";

const EditForm = () => {
    const { windowUrl, user, url, editUsername, setEditUsername, editPassword, setEditPassword } = useContext(GlobalContext);

    const edit = () => {

        axios({
            method: 'patch',
            data: {
                username: editUsername,
                password: editPassword
            },
            withCredentials: true,
            url: url + `/users/${user.id}/edit`
        })
            .then(res => {
                console.log(res.data);
                alert(res.data);
                logout();
            })
            .catch(err => console.log(err));
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        edit();
    };

    return (
        <div className="edit-user">
            {(user.id === '60545c0af5550243a03bbdbf') ? <h2>Change admin</h2> :
                <h2>Change password for {user.username}</h2>}
            {(user.id === '60545c0af5550243a03bbdbf') ?
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <input
                        type="email"
                        placeholder="new email"
                        onChange={e => setEditUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="new password"
                        onChange={e => setEditPassword(e.target.value)}
                    />
                    <button className="btn btn-primary">submit</button>
                </form> :

                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <input
                        type="password"
                        placeholder="new password"
                        onChange={e => setEditPassword(e.target.value)}
                    />
                    <button className="btn btn-primary">submit</button>
                </form>
            }
        </div>
    );
}

export default EditForm;