import { Link } from "react-router-dom"

const Invalid = () => {
    return ( 
        <div className="invalid jumbotron">
        
            <h3>Invalid email or password</h3>
            <br/>
            <Link to="/">back to homepage...</Link>
        </div>
     );
}
 
export default Invalid;