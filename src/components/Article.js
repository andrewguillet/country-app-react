import { useState } from "react";
import axios from "axios";

export default function Article({ article }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");

  function dateFormater(date) {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return newDate;
  }

  function handleEdit() {
    const data = {
      author: article.author,
      content: editContent ? editContent : article.content,
      date: article.date,
      updatedData: Date.now(),
    };
    axios
      .put("http://localhost:3004/articles/" + article.id, data)
      .then(() => setIsEditing(false));
  }

  function handleDelete() {
    axios.delete("http://localhost:3004/articles/" + article.id);
    window.location.reload();
  }

  return (
    <div className="article">
      <div className="card-header">
        <h3>{article.author}</h3>
        {article.updatedData && (
          <em>Modifié le {dateFormater(article.updatedData)}</em>
        )}
        <em>Posté le {dateFormater(article.date)}</em>
      </div>
      {isEditing ? (
        <textarea
          value={editContent ? editContent : article.content}
          onChange={(e) => setEditContent(e.target.value)}
        ></textarea>
      ) : (
        <p>{editContent ? editContent : article.content}</p>
      )}
      <div className="btn-container">
        {isEditing ? (
          <button onClick={() => handleEdit()}>Valider</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}

        <button
          onClick={() => {
            if (window.confirm("Voulez-vous supprimer cet article ?")) {
              handleDelete();
            }
          }}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}
