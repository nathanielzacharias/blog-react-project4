import Table from "react-bootstrap/Table";
import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Button from '@mui/material/Button';

function AllPosts() {

    const [data, setData] = useState([]);
    const [refreshAfterDelete, setRefreshAfterDelete] = useState('True');
    const articlesArray = useRef([])

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/api/v1/articles/show-all-posts`, 
        {
        method: "POST",
        body: JSON.stringify({
            token: localStorage.getItem("user_token")
        }),
        headers: {
          "Content-type": "application/json",
        },
      })

      const data = await res.json();

      setData(res.allPosts);
      articlesArray.current = data.allPosts;
      // console.log(data)
      // console.log(articlesArray);
    //   console.log(articlesArray.current[0].published)

    };

    fetchAPI();
  }, [refreshAfterDelete]);

  const handleDelete = (event) => {
    event.preventDefault();
    const docID = event.target.getAttribute('docID')
    console.log(docID)

    fetch(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/v1/articles/delete`, {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem("user_token"),
        docID: docID,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
    setRefreshAfterDelete(!refreshAfterDelete)
  };

  return (
    <Container>
    
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Summary</th>
          <th>Published</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
         {articlesArray.current.map((e, index) => (
             <tr>
                <td key='1'>{index+1}</td>
                <td key='2'>{e.title}</td>
                <td key='3'>{e.summary}</td>
                <td key='4'>{e.published.toString()}</td>
                <td key='5'>
                    <Button variant="contained" sx={{ m: 2 }} type="submit" name="saveDraft" >Edit</Button>
                </td>
                <td key='6'>
                    <Button variant="contained" sx={{ m: 2 }} name="deleteButton" onClick={handleDelete} docID={e._id} >Delete</Button>
                </td>
             </tr>
            ))}
      </tbody>
    </Table>
    </Container>

  );
}

export default AllPosts;
