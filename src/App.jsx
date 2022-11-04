import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import TopNavbar from './components/TopNavbar';
import Container from 'react-bootstrap/Container';
import DisplayArticle from './components/DisplayArticle';
// import axios from "axios";
// import React, { useState, useEffect } from "react";


function App() {


  return (
    <div className="App">

      <Container>
        <TopNavbar/>
      </Container>

      <Container>
        <Routes>
          <Route path="/" element={<DisplayArticle path={'/api/v1/main/latest'} />} />
          {/* <Route path="/api/v1/main/latest" element={<ArticleCard  />} /> */}
          {/* <Route path="/api/v1/main/browse" element={<DisplayArticle />} /> */}

          

        </Routes>
      </Container>

      
    </div>
  );
}

export default App;