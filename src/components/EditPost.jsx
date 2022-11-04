import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect, useRef } from "react";
import parse from 'html-react-parser';

export default function EditPost() {

    const navigate = useNavigate();

    const docIDForEdit = useRef([])
    useEffect( () => {
        docIDForEdit.current = localStorage.getItem("edit_docID")
        console.log("docIDForEdit is:",docIDForEdit.current)
    }, []);

    const getPath = useRef([])
    useEffect( () => {
        getPath.current = `/api/v1/main/browse/${docIDForEdit.current}`
        console.log("getPath is:", getPath.current)
    }, [docIDForEdit.current]);

    const titleRef = useRef([])
    const summaryRef = useRef([])
    const [reactElementForArticle, setReactElementForArticle] = useState([]);
    const [getArticle, setGetArticle] = useState([]);
    const articleBodyRef = useRef([])
    useEffect(() => {
        const fetchAPI = async () => {
            const res = await fetch(`${process.env.REACT_APP_BASE_BACKEND_URL}${getPath.current}`);
            const data = await res.json();
            console.log("data is:", data)
            setGetArticle(data);

            titleRef.current = data.selectedArticle[0].title
            summaryRef.current = data.selectedArticle[0].summary
            articleBodyRef.current = data.selectedArticle[0].body
          };

        fetchAPI();
        console.log("getArticle is:", getArticle)
    }, [getPath.current]);

    const handleSave = (event) => {
      event.preventDefault();
  
    //   console.log(event.nativeEvent.submitter.name)
      let buttonName = event.nativeEvent.submitter.name;
      if (buttonName === 'saveDraft') publishedState.current = false;
      if (buttonName === 'saveAndPublish') publishedState.current = true;

      const data = new FormData(event.currentTarget);
      console.log({
        _id: localStorage.getItem("edit_docID"),
        title: data.get("title"),
        summary: data.get("summary"),
        // body: data.get("articleBody"),
        body: articleBody,
        published: publishedState.current, 
        token: localStorage.getItem("user_token")
      });
  
      fetch(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/v1/articles/update`, {
        method: "POST",
        body: JSON.stringify({
            _id: localStorage.getItem("edit_docID"),
            title: data.get("title"),
            summary: data.get("summary"),
             // body: data.get("articleBody"),
            body: articleBody,
            published: publishedState.current, 
            token: localStorage.getItem("user_token")
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then(navigate("/all-posts"))
        .catch((err) => {
          toast.error(err.message);
        });
    };

    const  modules  = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            ["code-block"],
            [{ list:  "ordered" }, { list:  "bullet" }],
            [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
            // ["link", "image"],
            // ["clean"],
        ],
    };

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [articleBody, setArticleBody] = useState('');
    const publishedState = useRef(false)

    return (
        <Box
        component="form"
        onSubmit={handleSave}
        sx={{
            '& .MuiTextField-root': { m: 1, width: '75ch' },
        }}
        noValidate
        autoComplete="off"
        >
        <div>
            <h1>Edit Post</h1>
        </div>

        <div>
        <TextField
            id="title"
            name="title"
            label="Title"
            value={titleRef.current}
            // onInput={ e=> setTitle(e.target.value) }
            multiline
            rows={1}
            // placeholder={titleRef.current}
            />
        </div>

        <div>
        <TextField
            id="summary"
            name="summary"
            label="Summary"
            value={summary}
            onInput={ e => {
                setSummary(e.target.value)
                console.log("summary is:", summary)
            }}
            multiline
            rows={4}
            // placeholder={summaryRef.current}
            />
        </div>

        <div>
            <ReactQuill 
            theme="snow"
            id="articleBody"
            name="articleBody"
            label="Article Body"
            value={articleBodyRef.current}
            // onChange={setArticleBody}
            modules={modules}
            />
        </div>

        <div>
            <Button variant="contained" sx={{ m: 2 }} type="submit" name="saveDraft" >Save Draft</Button>
            <Button variant="contained" sx={{ m: 2 }} type="submit" name="saveAndPublish" >Save & Publish</Button>
        </div>

        </Box>
    );
}