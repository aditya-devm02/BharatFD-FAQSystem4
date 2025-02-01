import React, { useEffect, useState } from "react";
import axios from "axios";

const FaqList = ({ lang }) => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/faqs?lang=${lang}`)
      .then((res) => setFaqs(res.data))
      .catch((err) => console.error(err));
  }, [lang]);

  return (
    <div>
      <h2>FAQs</h2>
      {faqs.map((faq, index) => (
        <div key={index}>
          <h4>{faq.question}</h4>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FaqList;
