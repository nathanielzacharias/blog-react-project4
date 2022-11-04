import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';

function ArticleCard(props) {
  return (
    // <Card style={{ width: '18rem' }}>
    <Card>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">by {props.author}</Card.Subtitle>
        <Card.Text>
          {props.summary}
        </Card.Text>
        <Card.Link href="#">View full article</Card.Link>
        {/* <Card.Link href="#">Another Link</Card.Link> */}
      </Card.Body>
    </Card>
  );
}

export default ArticleCard;