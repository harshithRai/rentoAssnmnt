import React, { useEffect, useState } from "react";
import { Box, CustomButton } from "..";

const PostDetails = (props) => {
  const { postDetail, redirectToPage } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState();

  useEffect(() => {
    const fetchComments = () => {
      !comments &&
        fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${postDetail.id}`
        )
          .then((result) => {
            return result.json();
          })
          .then((data) => {
            setComments(data);
          })
          .catch((error) => {
            console.log(error);
          });
    };
    fetchComments();
  }, [comments, postDetail.id, showComments]);

  const toggleShowComments = () => {
    setShowComments(!showComments);
  };

  const deletePost = () => {
    const requestOptions = {
      method: "DELETE",
    };
    fetch(
      `https://jsonplaceholder.typicode.com/posts/${postDetail.id}`,
      requestOptions
    )
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        redirectToPage("PostList");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="flex-start">
      <h2>{postDetail.title}</h2>
      <Box fontSize={[16, 18, 18]}>{postDetail.body}</Box>
      <Box
        isLink
        fontSize={[10, 10, 12]}
        color="blue"
        scaleRatio={"scale(1.001)"}
        onClick={() => {
          toggleShowComments();
        }}
      >
        {showComments ? "Hide" : "Show"} Comments
      </Box>
      {showComments && comments ? (
        <Box
          border="1px solid black"
          borderRadius={10}
          m={[2, 3, 3]}
          p={[1, 2, 3]}
        >
          {comments.map((comment) => {
            return (
              <Box display="flex" flexDirection="column">
                <Box fontWeight="bold" fontSize={[11, 11, 12]}>
                  {comment.name}
                </Box>
                <Box fontSize={[12, 12, 13]}>
                  <em>{comment.body}</em>
                </Box>
                <Box color="grey" fontSize={[11, 11, 12]}>
                  <em>{comment.email}</em>
                </Box>
                <hr />
              </Box>
            );
          })}
        </Box>
      ) : null}
      <hr />
      <CustomButton
        width={[70, 100]}
        height={[20, 30]}
        bg="crimson"
        borderRadius={[2, 4]}
        border="2px solid red"
        p={[10, "4px"]}
        color="#fff"
        fontSize={[12, 13, 14]}
        textAlign="center"
        onClick={deletePost}
      >
        Delete Post
      </CustomButton>
    </Box>
  );
};

export default PostDetails;
