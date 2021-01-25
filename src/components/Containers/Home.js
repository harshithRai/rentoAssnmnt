import React, { Suspense, lazy, useState, useEffect } from "react";
import { Box, Image } from "..";
// import { users } from "../../utils/data";

const PostDetails = lazy(() =>
  import(/* webpackChunkName: "Home" */ "../Pages/PostDetails")
);

const PostList = lazy(() =>
  import(/* webpackChunkName: "Home" */ "../Pages/PostList")
);

const UserList = lazy(() =>
  import(/* webpackChunkName: "Home" */ "../Pages/UserList")
);

const Home = () => {
  const [isLoading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentComponentIdentifier, setCurrentComponentIdentifier] = useState(
    "UserList"
  );
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currentPostID, setCurrentPostID] = useState(null);
  const [postDetail, setPostDetail] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const fetchUsers = () => {
      setLoading(true);
      // currentUser &&
      fetch(`https://jsonplaceholder.typicode.com/users`)
        .then((result) => {
          setLoading(false);
          return result.json();
        })
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPostList = () => {
      // currentUser &&
      setLoading(true);
      fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${currentUser?.userID}&skip=0&limit=10`
      )
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          setLoading(false);
          setPosts(data);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    };
    fetchPostList();
  }, [currentUser]);

  useEffect(() => {
    const fetchPostDetail = () => {
      // currentUser &&
      setLoading(true);
      fetch(`https://jsonplaceholder.typicode.com/posts/${currentPostID}`)
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          setLoading(false);
          setPostDetail(data);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    };
    fetchPostDetail();
  }, [currentPostID]);

  const prepPostsRoute = (objArgs) => {
    const { route, userID } = objArgs;
    redirectToPage(route);
    setCurrentUser({ userID, name: getCurrentUserName(userID) });
  };

  const prepPostDetailsRoute = (objArgs) => {
    const { route, postID } = objArgs;
    redirectToPage(route);
    setCurrentPostID(postID);
  };

  const getCurrentUserName = (userID) => {
    const filteredItems = users && users.filter((user) => user.id === userID);
    return filteredItems[0]?.name;
  };

  const redirectToPage = (componentId) => {
    if (currentComponentIdentifier !== componentId) {
      setCurrentComponentIdentifier(componentId);
    }
  };

  const components = {
    PostDetails: (
      <PostDetails
        changeHandler={null}
        postDetail={postDetail}
        redirectToPage={redirectToPage}
      />
    ),
    PostList: (
      <PostList
        routeToPostDetail={prepPostDetailsRoute}
        posts={posts}
        currentUserName={currentUser?.name ? currentUser.name : null}
        currentUserID={currentUser?.userID}
        redirectToPage={redirectToPage}
      />
    ),
    UserList: (
      <UserList
        users={users}
        routeToPosts={prepPostsRoute}
        redirectToPage={redirectToPage}
      />
    ),
  };

  const renderCurrentComponent = () => {
    const CurrentComponent = components[currentComponentIdentifier];
    return CurrentComponent;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      m={10}
      p={["15px", "15px", "20px"]}
      bg={darkMode ? "#000" : null}
      color={darkMode ? "#fff" : null}
    >
      <Box
        width="100%"
        bg="#0c6d96"
        justifyContent="center"
        textAlign="center"
        color="#fff"
        height={["", "", "50px"]}
        p={3}
        isLink
        onClick={() => {
          redirectToPage("UserList");
        }}
      >
        RENTOMOJO
      </Box>
      <Box
        width="100%"
        bg={darkMode ? "#000" : "white"}
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        textAlign="right"
        color={darkMode ? "#fff" : "#000"}
        height={["", "", "50px"]}
        p={3}
      >
        <>Dark Mode</>
        &nbsp;&nbsp;&nbsp;&nbsp;
        {!!darkMode ? (
          <Box
            onClick={() => {
              toggleDarkMode();
            }}
            scaleRatio={"scale(1)"}
            isLink
          >
            <Image
              src={require(`../../Assets/Images/switch on.svg`).default}
              height={40}
              width="auto"
              alt="darkModeOff"
            />
          </Box>
        ) : (
          <Box
            isLink
            onClick={() => {
              toggleDarkMode();
            }}
            scaleRatio={"scale(1)"}
          >
            <Image
              src={require(`../../Assets/Images/switch off.svg`).default}
              height={40}
              width="auto"
              alt="darkModeOff"
            />
          </Box>
        )}
      </Box>
      {!!isLoading ? (
        <Box>
          <h2>Loading...</h2>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          alignItems={["center", "flex-start", "flex-start"]}
          justifyContent={["center", null, "space-between"]}
          // p={["15px", "15px", "20px"]}
        >
          <Box
            flex={["0 1 100%", "0 1 100%", "0 1 100%"]}
            minHeight="100%"
            maxWidth={["100%", "100%", "100%"]}
          >
            <Suspense
              fallback={
                <div className="loaderContainer">
                  <div className="loaderWrapper">
                    <div className="loader">Loading...</div>
                  </div>
                </div>
              }
            >
              {renderCurrentComponent()}
            </Suspense>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Home;
