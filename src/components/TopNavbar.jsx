import Nav from 'react-bootstrap/Nav';

function TopNavbar() {
    return(

    <Nav fill variant="tabs" defaultActiveKey="/home" >
        <Nav.Item>
          <Nav.Link href="/api/v1/main/latest">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/api/v1/main/browse">Browse</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/api/v1/user/login">Login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3">Register</Nav.Link>
        </Nav.Item>
    </Nav>

    )
}

export default TopNavbar;