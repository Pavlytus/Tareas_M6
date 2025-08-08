import Tweet from "./Tweet";

const TweetList = ({ tweets, onLike, user }) => {

  return (

    <div>

      {tweets.map((tweet) => (

        <Tweet key={tweet.id} tweet={tweet} onLike={onLike} user={user} />

      ))}

    </div>

  );

};

export default TweetList;