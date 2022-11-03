import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";


function DisplayArticle(){
    const title = useRef([])
    const [data, setData] = useState([]);

    useEffect(() => {

        const fetchAPI = async () => {
            const res = await fetch(
              `${process.env.REACT_APP_BASE_BACKEND_URL}/api/v1/main/latest`
            );
            const data = await res.json();
      
            setData(res.returnArticle);
            console.log("data is:", data.returnArticle.title)
            title.current = data.returnArticle.title
            console.log("typeof title is: ", typeof(title))
            console.log("title is:", title)
          };

        fetchAPI();
    }, []);

    return(
            <h1>
                { title.current }
            </h1>
              
    );
}

export default DisplayArticle;
