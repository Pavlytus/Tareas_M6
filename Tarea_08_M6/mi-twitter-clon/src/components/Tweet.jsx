const Tweet = ({ tweet, onLike, user }) => {
  const handleLike = () => {
    if (!user) {
      alert("Debes iniciar sesión para dar like.");
      return;
    }
    onLike(tweet.id);
  };

  return (
    <div className="tweet">
      <p>{tweet.text}</p>
      <button onClick={handleLike}>❤ {tweet.likes}</button>
    </div>
  );
};

export default Tweet;