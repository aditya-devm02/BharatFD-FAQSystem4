import React, { useState, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AdminPanel = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const quillRef = useRef(null); // Create a reference for the ReactQuill component

  const handleSubmit = () => {
    // Get the plain text from the ReactQuill editor using the ref and trim whitespace
    const plainAnswer = quillRef.current.getEditor().getText().trim();

    axios.post("http://localhost:8000/api/faqs", { question, answer: plainAnswer })
      .then(() => {
        setQuestion(""); 
        setAnswer("");
        alert("FAQ added successfully!");
      })
      .catch(err => console.error("Error adding FAQ:", err));
  };

  return (
    <div>
      <h2>Admin Panel - Add FAQ</h2>
      <input 
        type="text" 
        placeholder="Enter Question" 
        value={question} 
        onChange={(e) => setQuestion(e.target.value)} 
      />
      <ReactQuill 
        ref={quillRef} // Attach the reference to the ReactQuill component
        value={answer} 
        onChange={setAnswer} 
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AdminPanel;
