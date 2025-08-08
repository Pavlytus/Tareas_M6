import { useState, useEffect } from "react";
import TweetList from "../components/TweetList";
import TweetForm from "../components/TweetForm";

const Home = ({ user, logout }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const storedTweets = JSON.parse(localStorage.getItem("tweets")) || [];
    setTweets(storedTweets);
  }, []);

  useEffect(() => {
    localStorage.setItem("tweets", JSON.stringify(tweets));
  }, [tweets]);

  const addTweet = (text) => {
    if (!user) return;
    const newTweet = {
      id: Date.now(),
      text,
      likes: 0,
    };
    setTweets([newTweet, ...tweets]);
  };

  const likeTweet = (id) => {
    if (!user) return;
    setTweets(
      tweets.map((tweet) =>
        tweet.id === id ? { ...tweet, likes: tweet.likes + 1 } : tweet
      )
    );
  };

  return (
    <div>
      <h1>Bienvenido a Twitter</h1>
      {user ? (
        <div>
          <p>Hola, {user.username}!</p>
          <button onClick={logout}>Cerrar sesión</button>
          <TweetForm onAddTweet={addTweet} user={user} />
          <TweetList tweets={tweets} onLike={likeTweet} user={user} />
        </div>
      ) : (
        <p>Por favor, inicia sesión para ver y publicar tweets.</p>
      )}
    </div>
  );
};

export default Home;