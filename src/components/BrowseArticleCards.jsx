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
    <Container>
      {articlesArray.current.map((e) => (
        <ArticleCard key={e._id} docID={e._id} title={e.title} author={e.author} summary={e.summary}/>
      ))}
    </Container>
    
  );
}

export default BrowseArticleCards;