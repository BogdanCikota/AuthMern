import { Link } from "react-router-dom";
import ShowAllUsers from "./ShowAllUsers";
import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

const Admin = () => {
    const { user } = useContext(GlobalContext);

    return (
        <div className="admin-page">
            <h2>Hello Admin</h2>
            <Link to={`/users/${user.id}/edit`}>change admin</Link>
            
            <ShowAllUsers/>
        </div>
    );
}

export default Admin;