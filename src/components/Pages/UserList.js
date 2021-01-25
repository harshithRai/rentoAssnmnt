import React from "react";
import { Box } from "..";

const UserList = (props) => {
  const { users, routeToPosts } = props;

  return (
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
        users.map((user) => {
          return (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
              borderBottom="1px solid black"
              p="5px"
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
  );
};

export default UserList;
