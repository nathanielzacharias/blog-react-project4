import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import ArticleCard from "./ArticleCard";

function BrowseArticleCards() {
  const [data, setData] = useState([]);
  const articlesArray = useRef([])

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/api/v1/main/browse`
      );
      const data = await res.json();

      setData(res.articles);
      articlesArray.current = data.articles;
        // console.log(data)
        // console.log(articlesArray);

    };

    fetchAPI();
  }, []);

  return (
    <ul>
      {articlesArray.current.map((item) => (
        <li key={item._id}>
          <p>{item.title}</p>
        </li>
      ))}
    </ul>
    
  );
}

export default BrowseArticleCards;