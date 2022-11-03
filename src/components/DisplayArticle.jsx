import axios from "axios";
import React, { useState, useEffect } from "react";

function DisplayArticle(){
    let title = null
    const [data, setData] = useState([]);

    useEffect(() => {

        const fetchAPI = async () => {
            const res = await fetch(
              `${process.env.REACT_APP_BASE_BACKEND_URL}/api/v1/main/latest`
            );
            const data = await res.json();
      
            setData(res);
            console.log("data is:", data)
          };

        fetchAPI();
    }, []);

    // useEffect(() => {
    //     title = data.latestArticle[0].title
    //     console.log("title is:", title)
    // },[]);

    return(
        <p>{data}</p>
        
    )
}

export default DisplayArticle;
