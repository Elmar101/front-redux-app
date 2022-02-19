import React from "react";
import Container from "@mui/material/Container";
import UserList from "../user-page/user-list/UserList";
import { XTextareaSubmit } from "../../x-lib/components/XTextareaSubmit";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import TextFeed from "../../components/text-feed-component/TextFeed";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginTop: theme.spacing(2),
  color: theme.palette.text.secondary,
}));
const HomePage = () => {
  const { isLoggin } = useSelector((store) => ({ isLoggin: store.isLoggin }));
  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={16}>
          {isLoggin && (
            <Grid item xs={8}>
              <div className="mb-1">
              <Item>
                <XTextareaSubmit />
              </Item>
              </div>
              <TextFeed/>
            </Grid>
          )}

          <Grid item xs={isLoggin ? 8 : 16}>
            <Item>
              <UserList />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default HomePage;
