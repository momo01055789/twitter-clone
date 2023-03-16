import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useUserInfo from "../../../hooks/useUserInfo";
import PostForm from "../../../components/PostForm";
import Layout from "../../../components/Layout";
import Tweet from "../../../components/Tweet";
import TopNavLink from "../../../components/TopNavLink";

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();
  const [replies, setReplies] = useState([]);
  const [repliesLikedByMe, setRepliesLikedByMe] = useState([]);
  const { userInfo } = useUserInfo();

  function fetchData() {
    axios.get("/api/posts?id=" + id).then((response) => {
      setPost(response.data.post);
    });
    axios.get("/api/posts?parent=" + id).then((response) => {
      setReplies(response.data.posts);
      setRepliesLikedByMe(response.data.likedByMe);
    });
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchData();
  }, [id]);

  return (
    <Layout>
      {!!post?.id && (
        <div className="px-5 py-2">
          <TopNavLink title={userInfo?.username} />
          {post.parent && (
            <div className="pb-5">
              <Tweet {...post.parent} />
              <div className="ml-5 h-8 relative">
                <div
                  className="h-10 border-l-2 border-twitterBorder absolute -top-5"
                  style={{ marginLeft: "20px" }}
                ></div>
              </div>
            </div>
          )}
          <Tweet {...post} big />
        </div>
      )}
      {!!userInfo && (
        <div className="border-t border-twitterBorder py-5">
          <PostForm
            onPost={fetchData}
            parent={id}
            compact
            placeholder={"Tweet your reply"}
          />
        </div>
      )}
      <div className="">
        {replies.length > 0 &&
          replies.map((reply) => (
            <div className="p-5 border-t border-twitterBorder" key={reply._id}>
              <Tweet
                {...reply}
                likedByMe={repliesLikedByMe.includes(reply._id)}
              />
            </div>
          ))}
      </div>
    </Layout>
  );
}
