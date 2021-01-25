import React, { useEffect, useState } from "react";
import { Box, StyledInputBox } from "..";

const PostList = (props) => {
  const { posts, currentUserName, routeToPostDetail, currentUserID } = props;

  const [allPosts, setAllPosts] = useState(posts);

  const [filterText, setFilterText] = useState("");

  const changeHandler = (event) => {
    setFilterText(event.target.value);
  };

  useEffect(() => {
    const fetchPostList = () => {
      // currentUser &&
      fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${currentUserID}&skip=0&limit=10`
      )
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          setAllPosts(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchPostList();
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <>
        <h2>Posts by {currentUserName}</h2>
      </>
      <Box p={2}>
        <StyledInputBox
          placeholder="Filter by title"
          onChange={(event) => {
            changeHandler(event);
          }}
          border="1px solid black"
        />
      </Box>
      <Box>
        <ul>
          {allPosts &&
            allPosts.map((post, index) => {
              return post.title.includes(filterText) ? (
                <li key={`${index}_key`}>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignContent="center"
                    alignItems="center"
                    maxWidth={["", "", "50%"]}
                    flexWrap="wrap"
                  >
                    <Box>{post.title}</Box>
                    <Box
                      color="blue"
                      fontSize={[14, 14, 14]}
                      isLink
                      onClick={() => {
                        routeToPostDetail({
                          route: "PostDetails",
                          postID: post.id,
                        });
                      }}
                    >
                      Visit post
                    </Box>
                  </Box>
                </li>
              ) : null;
            })}
        </ul>
      </Box>
    </Box>
  );
};

export default PostList;
