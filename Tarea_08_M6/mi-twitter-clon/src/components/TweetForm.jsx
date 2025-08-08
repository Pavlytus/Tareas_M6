import { useState } from "react";

const TweetForm = ({ onAddTweet, user }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    if (!user) {
      alert("Debes iniciar sesión para publicar un tweet.");
      return;
    }
    onAddTweet(text);
    setText("");
  };

  if (!user) return null; // No mostrar formulario si no hay usuario

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="¿Qué estás pensando?"
      />
      <button type="submit">Tweet</button>
    </form>
  );
};

export default TweetForm;