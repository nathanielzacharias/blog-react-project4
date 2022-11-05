// import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import "highlight.js/styles/github-dark-dimmed.css";
import hljs from "highlight.js";
import "./SelectedArticle.css";

function SelectedArticle() {
  const params = useParams();
  const path = `/api/v1/main/browse/${params.id}`;
  // console.log(params.id)
  const title = useRef([]);
  const author = useRef([]);
  const summary = useRef([]);
  const articleBody = useRef([]);
  const [data, setData] = useState([]);
  const [reactElementForArticle, setReactElementForArticle] = useState([]);

  useEffect(() => {
    hljs.configure({
      cssSelector: "pre",
    });
    hljs.highlightAll();
  });

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_BACKEND_URL}${path}`
      );
      const data = await res.json();

      setData(res.selectedArticle);
      console.log("data is:", data.selectedArticle[0].title);
      title.current = data.selectedArticle[0].title;
      console.log("typeof title is: ", typeof title);
      console.log("title is:", title);
      author.current = data.selectedArticle[0].author;
      console.log("author is:", author);
      summary.current = data.selectedArticle[0].summary;
      console.log("summary is:", summary);
      articleBody.current = data.selectedArticle[0].body;
      console.log("articleBody is:", articleBody);
      setReactElementForArticle(parse(articleBody.current));
    };

    fetchAPI();
  }, []);

  return (
    <Container className="Article">
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        {title.current}
      </h1>

      {/* <h2>
                by {author.current}
            </h2> */}

      <Container className="Section">
        <h5 style={{ display: "flex", justifyContent: "left" }}>Summary:</h5>
        <p>{summary.current}</p>
      </Container>

      <Container className="Section">
        <h5 style={{ display: "flex", justifyContent: "left" }}>Article:</h5>
        {reactElementForArticle}
      </Container>
    </Container>
  );
}

export default SelectedArticle;
