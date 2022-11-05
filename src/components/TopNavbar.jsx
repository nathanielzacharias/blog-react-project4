import Nav from 'react-bootstrap/Nav';
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

function logoutHandler(e) {
    e.preventDefault();
    localStorage.removeItem("user_token");
    window.location.reload(false);
  }

function TopNavbar() {

  const token = localStorage.getItem("user_token");
  let userId = "";
  if (token) {
    userId = jwt_decode(token).data.objId;
  }

    return(

    <Nav fill variant="tabs" defaultActiveKey="/home" >
        {/* <Nav.Item>
          <Nav.Link href="/api/v1/main/latest">Home</Nav.Link>
        </Nav.Item> */}
        <Nav.Item>
          <Link to={"/api/v1/main/latest"}>Home</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={"/api/v1/main/browse"}>Browse</Link>
        </Nav.Item>

        {token ? (
        <>
            <Nav.Item>
                <Link to={"/new-post"}>New Post</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to={"/all-posts"}>All Posts</Link>
            </Nav.Item>
        </>

        ) : (
            ""
        )} 

        {token ? (
            <Nav.Item>
                <Link onClick={logoutHandler}>Logout</Link>
            </Nav.Item>
        ) : (
            <>
            <Nav.Item>
                <Link to={"/api/v1/user/login"}>Login</Link>
            </Nav.Item>
            <Nav.Item>
                <Link to={"/api/v1/user/register"}>Register</Link>
            </Nav.Item>
        </>
        )} 





    </Nav>

    )
}

export default TopNavbar;