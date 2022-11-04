import Nav from 'react-bootstrap/Nav';
import jwt_decode from "jwt-decode";

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
        <Nav.Item>
          <Nav.Link href="/api/v1/main/latest">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/api/v1/main/browse">Browse</Nav.Link>
        </Nav.Item>

        {token ? (
        <>
            <Nav.Item>
                <Nav.Link href="/new-post">New Post</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/all-posts">All Posts</Nav.Link>
            </Nav.Item>
        </>

        ) : (
            ""
        )} 

        {token ? (
            <Nav.Item>
                <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
            </Nav.Item>
        ) : (
            <>
            <Nav.Item>
                <Nav.Link href="/api/v1/user/login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/api/v1/user/register">Register</Nav.Link>
            </Nav.Item>
        </>
        )} 





    </Nav>

    )
}

export default TopNavbar;