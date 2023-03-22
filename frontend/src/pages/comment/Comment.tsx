import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useGetComments, useGetCountComments, useSubmitComment } from "../../queries/CommentQuery";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import GenericTemplate from '../../components/templates/GenericTemplate';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Avatar from '@mui/material/Avatar';

const theme = createTheme();

const ComentPage: React.VFC = () => {
    const getComments = useGetComments();
    const getCountComments = useGetCountComments();
    const submitComment = useSubmitComment();
    const [comment, setComment] = useState('');
    const [fetch, setFetch] = useState(false);
    const navigate = useNavigate();

    useEffect(() =>  {
        const url = new URL(window.location.href);
        getComments.mutate(Number(url.searchParams.get('post_id')));
        getCountComments.mutate(Number(url.searchParams.get('post_id')));
	}, [fetch]);

    useEffect(() =>  {
        if (submitComment.isSuccess) {
            submitComment.reset()
            setFetch(!fetch);
        }
	}, [submitComment]);

    const handleSubmit = () => {
        const url = new URL(window.location.href);
        const postParams = {
            "postID": Number(url.searchParams.get('post_id')),
            "comment": comment
        };
        submitComment.mutate(postParams);
    }

    const backToViewPage = () => {
        const url = new URL(window.location.href);
        navigate({
            pathname: "/content-detail/view",
            search: '?id='+ url.searchParams.get('post_id')
        });
    }

    return (
        <GenericTemplate title=''>
			<ThemeProvider theme={theme}>
				<Container component="main" maxWidth="sm">
					<CssBaseline />
                    {getComments.isSuccess && getCountComments.isSuccess && (
                        <>
                            <Grid container sx={{mt:3, ml:1, mb:1}}>
                                <Grid item xs={10}>
                                    <Typography variant="body1" align='left'>
                                        コメント {JSON.parse(JSON.stringify(getCountComments.data)).data}件
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Link
                                        component="button"
                                        variant="body2"
                                        onClick={() => {backToViewPage()}}
                                    >
                                        戻る
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box sx={{border: 1, borderRadius: 4, mb: 6}}>
                                <Box sx={{p:2}}>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            {/* パスを入れる */}
                                            <Avatar
                                                src=""
                                                sx={{ width: 56, height: 56 }}
                                            />
                                        </Grid>
                                        <Grid item xs={10}>
                                            <TextareaAutosize
                                                aria-label="minimum height"
                                                minRows={4}
                                                name="thought"
                                                placeholder="入力"
                                                style={{ width: '100%', textAlign: 'left', padding: '10px' }}
                                                onChange={((e) => setComment(e.target.value))}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container justifyContent="flex-end">
                                        <Grid item xs={2}>
                                            <Button
                                                type="button"
                                                variant="outlined"
                                                color='inherit'
                                                onClick={() => handleSubmit()}
                                            >
                                                登録
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                            {JSON.parse(JSON.stringify(getComments.data)).data.map((comment: any) => {
                                return (
                                    <Paper elevation={3} sx={{my:2, border: 1, borderRadius: 4}}>
                                        <Box sx={{p:2}}>
                                            <Grid container>
                                                <Grid item xs={2}>
                                                <Avatar
                                                    src={comment.imagePath}
                                                    sx={{ width: 56, height: 56 }}
                                                />
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Grid container>
                                                        <Grid item xs={5} sx={{border: 'dotted'}}>
                                                            <Typography variant="subtitle1" align='center'>
                                                                {comment.userName}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <Typography variant="subtitle2" align='left' sx={{pl:1.5, pt:1.0}}>
                                                                {comment.daysAgo === 0 ? "今日" : comment.daysAgo + '日前'}
                                                            </Typography>
                                                        </Grid>
                                                        {/* 削除は一旦非表示 */}
                                                        {/* <Grid item xs={3}>
                                                            <Button
                                                                type="button"
                                                                variant="contained"
                                                                // onClick={() => handleSubmit()}
                                                            >
                                                                削除
                                                            </Button>
                                                        </Grid> */}
                                                    </Grid>
                                                    <Box sx={{mt:1.5, border: 1, p:1}}>
                                                        {comment.comment}
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Paper>
                                )
                            })}
                        </>
                    )}
                </Container>
            </ThemeProvider>
        </GenericTemplate>
    )
}

export default ComentPage