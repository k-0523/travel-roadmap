import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useUserContents } from "../../queries/ContentQuery";
import { useParams } from "react-router-dom";
import Loading from "../../components/ui/Loading";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { useFavoriteContents } from "../../queries/FavoriteQuery";

const ProfileTab: React.FC = () => {
  const { userId } = useParams();
  const path = process.env.REACT_APP_IMAGE_DOMAIN;

  const {
    data: contents,
    isLoading,
    isError,
  } = useUserContents(Number(userId));
  const {
    data: favoriteContents,
    isLoading: isFavoriteLoading,
    isError: isFavoriteError,
  } = useFavoriteContents(Number(userId));
  const [value, setValue] = React.useState("1");

  if (isLoading || isFavoriteLoading) {
    return <Loading />;
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            centered
          >
            <Tab label="スケッチ" value="1" />
            <Tab label="いいね" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {contents && contents.length > 0 ? (
            <ImageList cols={4}>
              {contents.map((content) => (
                <ImageListItem
                  key={content.ID}
                  component={Link}
                  to={`/content-detail/view?id=${content.ID}`}
                >
                  <img
                    src={`${path}${content.imagePath}`}
                    alt={content.title}
                    loading="lazy"
                    style={{ height: "200px" }}
                  />
                  <ImageListItemBar title={content.title} position="below" />
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            <Typography align="center">スケッチが存在しません</Typography>
          )}
        </TabPanel>
        <TabPanel value="2">
          {favoriteContents && favoriteContents.length > 0 ? (
            <ImageList cols={4}>
              {favoriteContents.map((fContent) => (
                <ImageListItem
                  key={fContent.postId}
                  component={Link}
                  to={`/content-detail/view?id=${fContent.postId}`}
                >
                  <img
                    src={`${path}${fContent.imagePath}`}
                    alt={fContent.title}
                    loading="lazy"
                    style={{ height: "200px" }}
                  />

                  <ImageListItemBar title={fContent.title} position="below" />
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            <Typography align="center">
              いいね済みスケッチが存在しません
            </Typography>
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ProfileTab;
