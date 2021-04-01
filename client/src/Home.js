import { Link, Redirect } from 'react-router-dom';
import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import authImg from './images/User-login.png'

const Home = () => {
    const { user, foundUser } = useContext(GlobalContext);

    return (
        <div>
            {
                (foundUser) ? <Redirect from='/' to={`/users/${user.id}`} /> :
                    <div className="home">
                        <Link className="btn btn-primary" to="/sign-up">sign up</Link>
                        <Link className="btn btn-primary" to="/login">login</Link>
                        <img src={authImg} alt="login icon"/>
                    </div>
            }
        </div>
    );
}

export default Home;