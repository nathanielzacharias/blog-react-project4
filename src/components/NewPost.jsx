import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from '@mui/material';
import { useState } from 'react';



export default function MultilineTextFields() {

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [articleBody, setArticleBody] = useState('');

    const navigate = useNavigate();

    const handleSave = (event) => {
      event.preventDefault();
  
      // console.log(event.currentTarget)
      const data = new FormData(event.currentTarget);
      console.log({
        title: data.get("title"),
        summary: data.get("summary"),
        body: data.get("articleBody")
      });
  
      fetch(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/v1/articles/save`, {
        method: "POST",
        body: JSON.stringify({
            title: data.get("title"),
            summary: data.get("summary"),
            body: data.get("articleBody"),
            token: localStorage.getItem("user_token")
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then(navigate("/"))
        .catch((err) => {
          toast.error(err.message);
        });
    };


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
            <h1>New Post</h1>
        </div>

        {/* <form  onSubmit={handleSave} > */}

        <div>
        <TextField
            id="title"
            name="title"
            label="Title"
            value={title}
            onInput={ e=> setTitle(e.target.value) }
            multiline
            rows={1}
            />
        </div>

        <div>
        <TextField
            id="summary"
            name="summary"
            label="Summary"
            value={summary}
            onInput={ e=> setSummary(e.target.value) }
            multiline
            rows={4}
            />
        </div>

        <div>
            <TextField
            id="articleBody"
            name="articleBody"
            label="Article Body"
            value={articleBody}
            onInput={ e=> setArticleBody(e.target.value) }
            multiline
            rows={10}
            />
        </div>

        <div>
            {/* <Button variant="contained" sx={{ m: 2 }} onClick={handleSave}>Save</Button> */}
            <Button variant="contained" sx={{ m: 2 }} type="submit">Save</Button>
            {/* <Button variant="contained" sx={{ m: 2 }}>Publish</Button> */}
        </div>

        {/* </form> */}

        </Box>
    );
}