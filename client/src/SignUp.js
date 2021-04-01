import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import googleIcon from './images/google-icon.png'

const SignUp = () => {
    let history = useHistory();
    const { url, signUpUsername, setSignUpUsername, signUpPassword, setSignUpPassword } = useContext(GlobalContext);

    const signUp = () => {
        if (signUpUsername === '' || setSignUpPassword === '') {
            history.push('/sign-up');
        } else {
            axios({
                method: 'post',
                data: {
                    username: signUpUsername,
                    password: signUpPassword
                },
                withCredentials: true,
                url: url + '/sign-up'
            })
                .then((res) => {
                    console.log(res);
                    alert(res.data);
                    history.push('/');
                });
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signUp();
    };

    const signUpGoogle = () => {
        window.open(url + '/auth/google', '_self');
    };

    return (
        <div className="sign-up">
            <h2>Sign up</h2>
            <form onSubmit={(e) => { handleSubmit(e) }}>
                <input
                    type="email"
                    placeholder="your email"
                    onChange={e => setSignUpUsername(e.target.value)} />
                <input
                    type="password"
                    placeholder="your password"
                    onChange={e => setSignUpPassword(e.target.value)} />
                <button className="btn btn-primary">submit</button>
            </form>
            <div className="googleAuth">
                <div className="btn btn-light" onClick={signUpGoogle}>
                    <img className="googleIcon" src={googleIcon} alt="google icon" />
                sign up with google</div>
            </div>
        </div>
    );
}

export default SignUp;