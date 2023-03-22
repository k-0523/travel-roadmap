import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"
import { useGetContents } from "../../queries/ContentQuery";
import GenericTemplate from '../../components/templates/GenericTemplate';
import Sort from '../../components/templates/Sort';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Typography } from '@mui/material';

const theme = createTheme({
	palette: {
		background: {
			default: '#f5f5f5',
		},
	}
});

const ContentPage: React.VFC = () => {
    const getContents = useGetContents();
    const navigate = useNavigate();
    const url = new URL(window.location.href);
    const sortCreatedAt = url.searchParams.get('sortCreatedAt') || '';
    const accompany = url.searchParams.get('accompany') || '';
    const numberOfPerson = url.searchParams.get('numberOfPerson') || '';
    const month = url.searchParams.get('month') || '';
    const nights = url.searchParams.get('nights') || '';
    const days = url.searchParams.get('days') || '';
    const currency = url.searchParams.get('currency') || '';
    const country = url.searchParams.get('country') || '';
    const prefecture = url.searchParams.get('prefecture') || '';
    const city = url.searchParams.get('city') || '';
    const fromBudget = url.searchParams.get('fromBudget') || '';
    const toBudget = url.searchParams.get('toBudget') || '';

    useEffect(() =>  {
        const searchParam = {
            'sortCreatedAt': sortCreatedAt,
            'accompany': accompany,
            'numberOfPerson': numberOfPerson,
            'month': month,
            'nights': nights,
            'days': days,
            'currency': currency,
            'country': country,
            'prefecture': prefecture,
            'city': city,
            'fromBudget': fromBudget,
            'toBudget': toBudget,
        }
        getContents.mutate(searchParam);
	}, [
        sortCreatedAt,
        accompany,
        numberOfPerson,
        month,
        nights,
        days,
        currency,
        country,
        prefecture,
        city,
        fromBudget,
        toBudget
    ]);

    const jumpToDetailPage = (postID: number) => {
        navigate({
            pathname: "/content-detail/view",
            search: '?id='+ postID
        });
    }

    return (
        <GenericTemplate title=''>
			<ThemeProvider theme={theme}>
				<Container component="main" maxWidth="xl">
					<CssBaseline />
                    {getContents.isSuccess && (
                        <ImageList cols={4}>
                            {JSON.parse(JSON.stringify(getContents.data)).data.map((content: any) => (
                                content.imagePath !== '' && (
                                    <Box key={content.ID}>
                                        <ImageListItem sx={{mt: 3, mb: 1, px:0.5}}>
                                            <img
                                                src={`${content.imagePath}`}
                                                onClick={() => jumpToDetailPage(content.ID)}
                                                style={{borderRadius: "20px",height: "200px"}}
                                            />
                                            <Typography variant='h6' align='center'>
                                                {content.title}
                                            </Typography>
                                        </ImageListItem>
                                    </Box>
                                )
                            ))}
                        </ImageList>
                    )}
                    <Sort />
                </Container>
            </ThemeProvider>
        </GenericTemplate>
    )
}

export default ContentPage