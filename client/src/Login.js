import axios from "axios";
import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import { useHistory } from "react-router-dom";
import googleIcon from './images/google-icon.png'

const Login = () => {
    let history = useHistory();
    const { windowUrl, url, loginUsername, setLoginUserName, loginPassword, setLoginPassword } = useContext(GlobalContext);
    const login = () => {
        axios({
            method: 'post',
            data: {
                username: loginUsername,
                password: loginPassword
            },
            withCredentials: true,
            url: url + '/login'
        })
            .then((res) => {
                console.log(res);
                if (res.data === 'No User Exists') {
                    history.push('/error');
                } else {

                    // const redirect = async()=>{
                    //     await history.push(`users/${user.id}`);
                    // };

                    // redirect();

                    // window.location.reload();

                    window.open(windowUrl, '_self');

                }

            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
    };


    const loginGoogle = () => {
        window.open(url + '/auth/google', '_self');
    };


    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={(e) => { handleSubmit(e) }}>
                <input
                    type="email"
                    placeholder="your email"
                    onChange={e => setLoginUserName(e.target.value)} />
                <input
                    type="password"
                    placeholder="your password"
                    onChange={e => setLoginPassword(e.target.value)} />
                <button className="btn btn-primary">submit</button>
            </form>
            <div className="googleAuth">

                <div className="btn btn-light" onClick={loginGoogle}>
                    <img className="googleIcon" src={googleIcon} alt="google icon" />
                login with google</div>
            </div>
        </div>
    );
}

export default Login;