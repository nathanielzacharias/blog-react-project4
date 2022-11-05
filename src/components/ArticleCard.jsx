// import React, { useState, useEffect, useRef } from "react";
// import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

function ArticleCard(props) {
  return (
    <Card bg='light' text='dark' className='mb-2'>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        {/* <Card.Subtitle className="mb-2 text-muted">by {props.author}</Card.Subtitle> */}
        <Card.Text>
          {props.summary}
        </Card.Text>
        <Link to={`/api/v1/main/browse/${props.docID}`}>View full article</Link>
        {/* <Card.Link href="#">Another Link</Card.Link> */}
      </Card.Body>
    </Card>
  );
}

export default ArticleCard;