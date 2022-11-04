import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import TopNavbar from './components/TopNavbar';
import Container from 'react-bootstrap/Container';
import DisplayArticle from './components/DisplayArticle';
import BrowseArticleCards from './components/BrowseArticleCards';
import SelectedArticle from './components/SelectedArticle';
import TokenCheck from './components/TokenCheck';
import Login from './components/Login';
import Register from './components/Register';
import NewPost from './components/NewPost';
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
          {/* <Route path="/" element={<DisplayArticle path={'/api/v1/main/latest'} />} /> */}
          <Route path="/" element={<NewPost />} />

          <Route path="/api/v1/main/browse/:id" element={<SelectedArticle  />} />
          <Route path="/api/v1/main/browse" element={<BrowseArticleCards />} />
          <Route path="/api/v1/main/latest" element={<DisplayArticle path={'/api/v1/main/latest'} />} />

          <Route path="/api/v1/user/login" element={<TokenCheck component={Login} />} />
          <Route path="/api/v1/user/register" element={<TokenCheck component={Register} />} />
          <Route path="/new-post" element={<NewPost />} />




          

        </Routes>
      </Container>

      
    </div>
  );
}

export default App;
