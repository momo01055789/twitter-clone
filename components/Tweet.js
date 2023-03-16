import React from "react";
import Avatar from "./Avatar";
import TimeAgo from "timeago-react";
import Link from "next/link";
import PostButtons from "./PostButtons";

const Tweet = ({
  text,
  _id,
  author,
  likedByMe,
  likesCount,
  commentsCount,
  createdAt,
  images,
  big = false,
}) => {
  function showImages() {
    if (!images?.length) {
      return "";
    }
    return (
      <div className="flex -mx-1">
        {images.length > 0 &&
          images.map((img) => (
            <div className="m-1" key={img}>
              <img src={img} alt="" />
            </div>
          ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex w-full">
        {!!author?.image && (
          <Link href={`/${author?.username}`}>
            <div className="cursor-pointer">
              <Avatar src={author.image} />
            </div>
          </Link>
        )}
        <div className="pl-2 grow">
          <div>
            <Link href={`/${author?.username}`}>{author?.name}</Link>
            {big && <br />}
            <span className="pl-1 text-twitterLightGray">
              {" "}
              @<Link href={`/${author?.username}`}>{author?.username}</Link>
            </span>
            {createdAt && !big && (
              <span className="pl-1 text-twitterLightGray">
                <TimeAgo datetime={createdAt} />
              </span>
            )}
          </div>
          {!big && (
            <div>
              <Link href={`/${author?.username}/status/${_id}`}>
                <div className="w-full cursor-pointer">
                  {text}
                  {showImages()}
                </div>
              </Link>
              <PostButtons
                username={author?.username}
                id={_id}
                likesCount={likesCount}
                likedByMe={likedByMe}
                commentsCount={commentsCount}
              />
            </div>
          )}
        </div>
      </div>
      {big && (
        <div className="mt-2">
          <Link href={`/${author?.username}/status/${_id}`}>{text}</Link>
          {createdAt && (
            <div className="text-twitterLightGray text-sm">
              {new Date(createdAt)
                .toISOString()
                .replace("T", " ")
                .slice(0, 16)
                .split()
                .reverse()
                .join(" ")}
            </div>
          )}
          <PostButtons
            username={author?.username}
            id={_id}
            likesCount={likesCount}
            likedByMe={likedByMe}
            commentsCount={commentsCount}
          />
        </div>
      )}
    </div>
  );
};

export default Tweet;
