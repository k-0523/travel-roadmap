import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"
import { useGetSearchedContents } from "../../queries/ContentQuery";
import { useExecFavorite } from "../../queries/FavoriteQuery";
import GenericTemplate from '../../components/templates/GenericTemplate';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const theme = createTheme();

interface Content {
    ID: Number,
    userID: Number,
    title: String,
    imagePath: String,
    createdAt: String,
    isFavorited: Boolean,
    countViews: Number
}

const SearchedContentPage: React.VFC = () => {
    const getSearchedContents = useGetSearchedContents();
    const execFavorite = useExecFavorite();

    const navigate = useNavigate();
    const [searchedContents, setSearchedContents] = useState<Content[]>([]);
    const url = new URL(window.location.href);
    const keyword = url.searchParams.get('keyword') || '';
    const searchParam = {'keyword': keyword}

    useEffect(() =>  {
        getSearchedContents.mutate(searchParam);
	},[keyword]);

    const handleFavoriteButton = (postID: Number, userID: Number, index: number) => {
        execFavorite.mutate({"userID": 1, "postID": postID});
        setSearchedContents([
            ...searchedContents.slice(0, index),
            {
                ...searchedContents[index],
                isFavorited: !searchedContents[index]?.isFavorited
            },
            ...searchedContents.slice(index + 1)
        ]);
    }

    const jumpToDetailPage = (postID: Number) => {
        navigate({
            pathname: "/content-detail/view",
            search: '?id='+ postID
        });
    }

    useEffect(() =>  {
        if (getSearchedContents.isSuccess) {
            setSearchedContents(JSON.parse(JSON.stringify(getSearchedContents.data)).data);
        }
    }, [getSearchedContents.isSuccess]);

    return (
        <GenericTemplate title=''>
			<ThemeProvider theme={theme}>
				<Container component="main" maxWidth="lg">
					<CssBaseline />
                    <Box sx={{my:3}}>
                        <Typography variant="subtitle2" align='left'>
                            キーワード検索："{searchParam.keyword}"
                        </Typography>
                        {searchedContents.map((content: Content, index: number) => (
                            content.imagePath !== '' && (
                                <Grid container>
                                    <Grid item xs={5}>
                                        <ImageListItem>
                                            <img
                                                src={`${content.imagePath}`}
                                                style={{width: '480px', height: '290px'}}
                                                onClick={() => jumpToDetailPage(content.ID)}
                                            />
                                        </ImageListItem>
                                    </Grid>
                                    <Grid item xs={7} sx={{border: 1, mb:0.9}}>
                                        <Box>
                                            <Grid container>
                                                <Grid item xs={11}>
                                                    <Typography variant="body1" align='center' sx={{m:1,border: 'dotted', py:1}}>
                                                        {content.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <IconButton sx={{mt:1}}>
                                                        {content.isFavorited ? (
                                                            <>
                                                                <FavoriteIcon color={"secondary"} onClick={() => handleFavoriteButton(content.ID, content.userID, index)} sx={{ color: 'red' }} />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FavoriteBorderIcon onClick={() => handleFavoriteButton(content.ID, content.userID, index)} sx={{ color: 'red' }} />
                                                            </>
                                                        )}
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                            <Box sx={{border: 'dotted', p:2, mx:1, height: "220px"}}>

                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            )
                        ))}
                    </Box>
                </Container>
            </ThemeProvider>
        </GenericTemplate>
    )
}

export default SearchedContentPage