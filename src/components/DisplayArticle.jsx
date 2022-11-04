// import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import parse from 'html-react-parser';
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import { marked } from "marked";


const markdown = `
  \`\`\`typescript
    const variable = 'hello';

    function getProfile(id: string): {
      name: string; address: string, photo: string
    } {
      return {
        name: 'ben', address: "ben's house", photo: "/ben.png"
      };
    }
  \`\`\`
`;


function DisplayArticle(props){
    const title = useRef([])
    const author = useRef([])
    const summary = useRef([])
    const articleBody = useRef([])
    const [data, setData] = useState([]);
    const [reactElementForArticle, setReactElementForArticle] = useState([]);

    useEffect(() => {
        hljs.configure({
            cssSelector: 'pre'
          });
        hljs.highlightAll();

      }, []);

    useEffect(() => {

        const fetchAPI = async () => {
            const res = await fetch(
              `${process.env.REACT_APP_BASE_BACKEND_URL}${props.path}`
            );
            const data = await res.json();
      
            setData(res.returnArticle);
            console.log("data is:", data.returnArticle.title)
            title.current = data.returnArticle.title
            console.log("typeof title is: ", typeof(title))
            console.log("title is:", title)
            author.current = data.returnArticle.author
            console.log("author is:", author)
            summary.current = data.returnArticle.summary
            console.log("summary is:", summary)
            articleBody.current = data.returnArticle.body
            console.log("articleBody is:", articleBody)
            setReactElementForArticle(parse( articleBody.current ))

          };

        fetchAPI();
    }, []);

    return(
        <Container>
            <h1 >
                {title.current}
            </h1>

            <h2>
                by {author.current}
            </h2>

            <h3>
                Summary:
            </h3>
            <p>
                {summary.current}
            </p>

            <h3>
                Article:
            </h3>

            { reactElementForArticle }

            {/* <pre>
                <code className="language-javascript">const variable = 'raw';</code>
            </pre>

            <div dangerouslySetInnerHTML={{ __html: marked(markdown) }}></div> */}

        </Container>
              
    );
}

export default DisplayArticle;
