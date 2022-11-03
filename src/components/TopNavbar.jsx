import Nav from 'react-bootstrap/Nav';

function TopNavbar() {
    return(

    <Nav fill variant="tabs" defaultActiveKey="/home" >
        <Nav.Item>
          <Nav.Link href="/main/latest">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Browse</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3">Register</Nav.Link>
        </Nav.Item>
    </Nav>

    )
}

export default TopNavbar;