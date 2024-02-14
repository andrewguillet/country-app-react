import Article from "../components/Article";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Blog() {
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const [blogData, setBlogData] = useState([]);
  const [author, setAuthor] = useState("");

  function getData() {
    axios
      .get("http://localhost:3004/articles")
      .then((res) => setBlogData(res.data));
  }

  useEffect(() => getData(), []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (content.length < 140) {
      setError(true);
    } else {
      await axios.post("http://localhost:3004/articles", {
        author: author,
        content,
        date: Date.now(),
      });
      getData();
      setError(false);
      setAuthor("");
      setContent("");
    }
  };

  return (
    <div className="blog-container">
      <Logo />
      <Navigation />

      <h1>Blog</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Nom"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
        <textarea
          style={{ border: error ? "1px solid red" : "1px solid #61afb" }}
          placeholder="Message"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
        {error && <p>Il faut au minimum 140 caractères</p>}
        <input type="submit" value="Envoyer" />
      </form>
      <ul>
        {blogData
          .sort((a, b) => b.date - a.date)
          .map((article) => (
            <Article key={article.id} article={article} />
          ))}
      </ul>
    </div>
  );
}
