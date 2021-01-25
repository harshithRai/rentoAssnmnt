import React, { useState } from "react";
import { Box } from "..";
import { Image } from "../Common/Image";

const UserList = (props) => {
  const { users, routeToPosts, isDarkMode } = props;

  const [displayStyle, setDisplayStyle] = useState("list");

  const toggleViewStyle = () => {
    setDisplayStyle(displayStyle === "list" ? "grid" : "list");
  };

  return (
    <>
      <Box
        textAlign="right"
        mr={"20px"}
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        isLink
        scaleRatio={"scale(1)"}
        onClick={() => {
          toggleViewStyle();
        }}
      >
        {displayStyle !== "list" ? (
          <>
            <Image
              src={
                require(`../../Assets/Images/listView${
                  isDarkMode ? "" : "2"
                }.svg`).default
              }
              height={20}
              width="auto"
              alt="list view"
            />
            &nbsp;&nbsp; List View
          </>
        ) : (
          <>
            <Image
              src={
                require(`../../Assets/Images/gridView${
                  isDarkMode ? "" : "2"
                }.svg`).default
              }
              height={20}
              width="auto"
              alt="list view"
            />
            &nbsp;&nbsp; Grid View
          </>
        )}
      </Box>
      {displayStyle === "list" ? (
        <Box
          display="flex"
          flexDirection="column"
          fontSize={["16px", "16px", "15px"]}
        >
          <Box
            bg="#16c9c0"
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            color="#FFF"
            fontWeight="bold"
            p="5px"
          >
            <Box width="33.33%">Name</Box>
            <Box width="33.33%">Company</Box>
            <Box width="33.33%"></Box>
          </Box>

          {users &&
            users.map((user, index) => {
              return (
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-around"
                  borderBottom="1px solid black"
                  p="5px"
                  key={`${index}_key`}
                >
                  <Box width="33.33%">{user.name}</Box>
                  <Box width="33.33%">{user.company?.name}</Box>
                  <Box
                    width="33.33%"
                    isLink
                    color="blue"
                    onClick={() =>
                      routeToPosts({ route: "PostList", userID: user.id })
                    }
                  >
                    Posts
                  </Box>
                </Box>
              );
            })}
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-around"
        >
          {users &&
            users.map((user, index) => {
              return (
                <Box
                  display="grid"
                  width={[0.8, 0.2, 0.2]}
                  height={[0.6, 1 / 3, 0.8]}
                  color="rgb(9, 44, 76)"
                  p={["20px", "15px", "10px"]}
                  m={["1px", "1px", "2px"]}
                  minHeight={["125px", "125px", "150px"]}
                  borderRadius={10}
                  justifyContent="center"
                  boxShadow="0 10px 35px rgba(50, 50, 93, 0.1),
      0 2px 15px rgba(0, 0, 0, 0.07)"
                  bg="#fff"
                  key={`${index}_key`}
                  fontSize={["12px", "12px", ""]}
                >
                  <Box display="flex" flexDirection="column">
                    <Box>
                      <strong>Name:</strong> {user.name}
                    </Box>
                    <Box>
                      <strong>Company:</strong>
                      {user.company?.name}
                    </Box>
                    <Box
                      isLink
                      color="blue"
                      onClick={() =>
                        routeToPosts({ route: "PostList", userID: user.id })
                      }
                    >
                      Posts
                    </Box>
                  </Box>
                </Box>
              );
            })}
        </Box>
      )}
    </>
  );
};

export default UserList;
