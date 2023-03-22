import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useExecFavorite } from "../../../queries/FavoriteQuery";
import { useGetContentDetail } from "../../../queries/ContentDetailQuery";
import { useNavigate } from "react-router-dom"
import { CurrencyList, CurrencyArray } from '../../../utils/contents/currency';
import {
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton,
    LineIcon,
    LineShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";
import ViewDistinationPage from './Distination';

import GenericTemplate from '../../../components/templates/GenericTemplate';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ImageListItem from '@mui/material/ImageListItem';
import Modal from '@mui/material/Modal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Timeline } from '@mui/lab';
import LinkIcon from '@mui/icons-material/Link';
import MailIcon from '@mui/icons-material/Mail';

const theme = createTheme();

const ViewContentDetailPage: React.VFC = () => {
    const execFavorite = useExecFavorite();
    const getContentDetail = useGetContentDetail();
    const url = new URL(window.location.href);
    const [displayList, setDisplayList] = useState<{isDisplay: boolean}[]>([]);
    const [openShareModal, setOpenShareModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() =>  {
        getContentDetail.mutate({"postID": Number(url.searchParams.get('id'))});
	}, []);

    useEffect(() => {
        // 買い物リスト表示、非表示制御用項目
        if (getContentDetail.isSuccess) {
            // 表示制御の配列を追加
            let displays: {isDisplay: boolean}[] = [];
            JSON.parse(JSON.stringify(getContentDetail.data)).data.shoppingLists.map((shoppingList: any) => {
                displays.push({isDisplay: false})
            });
            setDisplayList(displays);
        }
    },[]);

    const content = (() => {
        if (getContentDetail.isSuccess) {
            return JSON.parse(JSON.stringify(getContentDetail.data)).data;
        }
    })();

    const handleFavoriteButton = (postID: number) => {
        execFavorite.mutate({"postID": postID});
    }

    const handleCommentButton = () => {
        const url = new URL(window.location.href);
        navigate({
            pathname: "/comment/list",
            search: '?post_id='+ url.searchParams.get('id')
        });
    }

    const jumpToEditPage = (postID: number) => {
        navigate({
            pathname: "/content-detail/edit",
            search: '?id='+ postID
        });
    }

    const tag = (() => {
        if (getContentDetail.isSuccess) {
        let tagLine = '';
        {content.tags.map((tag: any) => {
            tagLine = tagLine + ' ' + tag.name
        })}
        return tagLine.trim();
    }
    })();

    const handleDisplayButton = (index: number) => {
        setDisplayList([
            ...displayList.slice(0, index),
            {
                ...displayList[index],
                isDisplay: !displayList[index]?.isDisplay
            },
            ...displayList.slice(index + 1)
        ])
    }

    const shareModalStyle = {
        position: "absolute" as "absolute",
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        bgcolor: "background.paper",
        py: 2,
        px: 1,
    };

    const textToLink = (str: string) => {
        // 正規表現でURLを抽出
        const regexp_url = /(https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+)/g;
        let linked = str.replace(regexp_url, '<a href="$1">$1</a>');
        return linked;
    };

    const shareModal = (
        <Modal open={openShareModal} onClose={()=>setOpenShareModal(false)}>
            <Box sx={shareModalStyle}>
                <Grid container justifyContent="center" alignItems="center" spacing={3}>
                    <Grid item xs='auto'>
                        <LineShareButton url={url.href}>
                            <LineIcon round={true} size={40} />
                            <Typography variant="body2" align='center'>
                                Line
                            </Typography>
                        </LineShareButton>
                    </Grid>
                    <Grid item xs='auto'>
                        <WhatsappShareButton url={url.href}>
                            <WhatsappIcon round={true} size={40}/>
                            <Typography variant="body2" align='center'>
                                Whatsapp
                            </Typography>
                        </WhatsappShareButton>
                    </Grid>
                    <Grid item xs='auto'>
                        <FacebookShareButton url={url.href}>
                            <FacebookIcon round={true} size={40} />
                            <Typography variant="body2" align='center'>
                                Facebook
                            </Typography>
                        </FacebookShareButton>
                    </Grid>
                    <Grid item xs='auto'>
                        <TwitterShareButton url={url.href}>
                            <TwitterIcon round={true} size={40} />
                            <Typography variant="body2" align='center'>
                                Twitter
                            </Typography>
                        </TwitterShareButton>
                    </Grid>
                </Grid>

                <Grid container justifyContent="flex-start" alignItems="center" spacing={3} sx={{ mt: 0.1 }}>
                    <Grid item xs={3}>
                        <Box onClick={() => navigator.clipboard.writeText(url.href)}>
                            <Box sx={{ backgroundColor: 'silver', width: '38.75px', height: '38.75px', borderRadius: '20px', ml: 3 }}>
                                <LinkIcon sx={{ width: '80%', height: '80%', mt: 0.5, ml: 0.5, p:0.5 }}/>
                            </Box>
                            <Typography variant="body2" align='right' sx={{mt:0.5}}>
                                コピー
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <a href="message:" style={{textDecoration: 'none', color: 'black'}}>
                            <Box sx={{ backgroundColor: 'silver', width: '38.75px', height: '38.75px', borderRadius: '20px', ml: 1.5 }}>
                                <MailIcon sx={{ width: '80%', height: '80%', mt: 0.5, ml: 0.5, p:0.5 }}/>
                            </Box>
                            <Typography variant="body2" align='center' sx={{mt:0.5}}>
                                メール
                            </Typography>
                        </a>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );

    return (
        <GenericTemplate title=''>
			<ThemeProvider theme={theme}>
				<Container component="main" maxWidth="lg">
					<CssBaseline />
                    {content && (
                        <Grid container spacing={3}>
                            <Grid item xs={8}>
                                <Paper elevation={3} sx={{p:2, mt:3, borderRadius: 4}}>
                                    <Typography variant="h4" align='center' sx={{border: 'dotted', p: 1}}>
                                        {content.title}
                                    </Typography>
                                    <Grid container sx={{pt:1}}>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" align='left' sx={{pl:1}}>
                                                {content.createdAt.slice(0, 4)}.{content.createdAt.slice(5, 7)}.{content.createdAt.slice(8, 10)}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Grid container justifyContent="flex-end" alignItems="center">
                                                <Grid item xs='auto'>
                                                    <Typography variant="body2" align='right'>
                                                        <VisibilityIcon fontSize='small' sx={{p: 0.3}} />
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs='auto'>
                                                    <Typography variant="body2" align='right' sx={{pr:1, mb:0.8}}>
                                                        {content.countViews} 回
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <ImageListItem sx={{px:2, py: 1, width: '100%', height: '255px', objectFit: 'cover'}}>
                                        {content.thumbnail !== '' && (
                                            <img
                                                src={`${content.thumbnail}`}
                                                loading="lazy"
                                            />
                                        )}
                                    </ImageListItem>
                                    <Grid container sx={{mt:1.5}}>
                                        {content.isEnableEdit ? (
                                            <Grid item xs={8.5}>
                                                <Typography align='left' sx={{px:1, py:0.5}}>
                                                    {content.fromDate.slice(0, 4)}年{content.fromDate.slice(5, 7)}月{content.fromDate.slice(8, 10)}日
                                                        &nbsp;~&nbsp;
                                                    {content.toDate.slice(0, 4)}年{content.toDate.slice(5, 7)}月{content.toDate.slice(8, 10)}日
                                                </Typography>
                                            </Grid>
                                        ) : (
                                            <>
                                                <Grid item xs={1}>
                                                    <Typography align='center' sx={{border: 'dotted', px:1, py:0.5}}>
                                                        {content.fromDate.slice(6, 7)}月
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography align='center' sx={{border: 'dotted', px:1, py:0.5}}>
                                                        {content.nights}泊{content.days}日
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={5.5}></Grid>
                                            </>
                                        )}
                                        <Grid item xs={1.5}>
                                            <Typography align='center' sx={{border: 'dotted', px:1, py:0.5}}>
                                                {content.budget}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography align='center' sx={{border: 'dotted', px:1, py:0.5}}>
                                                {CurrencyArray.find((currency: CurrencyList) => Number(currency.value) === Number(content.currency))?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Typography align='left' sx={{mt:1.5, pl:1, py:0.5, border: 1}}>
                                        {tag}
                                    </Typography>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Grid container justifyContent="flex-start" alignItems="center">
                                                <Grid item xs='auto' sx={{mt:1}}>
                                                    <IconButton onClick={() => {handleFavoriteButton(content.ID)}}>
                                                        {execFavorite.isSuccess ? (
                                                            <>
                                                                {JSON.parse(JSON.stringify(execFavorite.data)).data.status ? (
                                                                    <>
                                                                        <FavoriteIcon color={"secondary"} sx={{ color: 'red' }} />
                                                                        <Typography variant="subtitle2" sx={{pl:0.5}}>
                                                                            {JSON.parse(JSON.stringify(execFavorite.data)).data.count}
                                                                        </Typography>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <FavoriteBorderIcon sx={{ color: 'red' }} />
                                                                        <Typography variant="subtitle2" sx={{pl:0.5}}>
                                                                            {JSON.parse(JSON.stringify(execFavorite.data)).data.count}
                                                                        </Typography>
                                                                    </>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <>
                                                                {content.isFavorited ? (
                                                                    <>
                                                                        <FavoriteIcon color={"secondary"} sx={{ color: 'red' }} />
                                                                        <Typography variant="subtitle2" sx={{pl:0.5}}>
                                                                            {content.countFavorites}
                                                                        </Typography>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <FavoriteBorderIcon sx={{ color: 'red' }} />
                                                                        <Typography variant="subtitle2" sx={{pl:0.5}}>
                                                                            {content.countFavorites}
                                                                        </Typography>
                                                                    </>
                                                                )}
                                                            </>
                                                        )}
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs='auto' sx={{mt:1}}>
                                                    <IconButton onClick={() => handleCommentButton()}>
                                                        <ModeCommentIcon />
                                                        <Typography variant="subtitle2" sx={{pl:0.5}}>
                                                            {content.countComments}
                                                        </Typography>
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Grid container justifyContent="flex-end" alignItems="center" sx={{mt:1}}>
                                                <Grid item xs='auto'>
                                                    {content.isEnableEdit && (
                                                        <Box sx={{pl:'auto'}}>
                                                            <Button
                                                                type="button"
                                                                variant="contained"
                                                                color='inherit'
                                                                onClick={() => jumpToEditPage(content.ID)}
                                                            >
                                                                編集
                                                            </Button>
                                                        </Box>
                                                    )}
                                                </Grid>
                                                <Grid item xs='auto'>
                                                    <Box sx={{mt:1, ml:1, mr:3}}>
                                                        <ShareIcon onClick={()=>setOpenShareModal(true)}/>
                                                        {shareModal}
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <Paper elevation={3} sx={{p:2, mt:3, borderRadius: 4}}>
                                    <Box sx={{border: 'dotted'}}>
                                        <Typography variant="h5" align='center' sx={{py:1, color:'red'}}>
                                            旅行の注意事項
                                        </Typography>
                                        {content.precautions.map((precaution: any, index: number) => {
                                            return (
                                                <Box sx={{borderTop: 1, py: 1, pl: 1.5}} key={index}>
                                                    <Typography variant="body1">
                                                    {index+1} &nbsp; {precaution.precaution}
                                                    </Typography>
                                                </Box>
                                            )
                                        })}
                                    </Box>
                                </Paper>

                                <Paper elevation={3} sx={{p:2, mt:3, borderRadius: 4}}>
                                    <Box sx={{border: 'dotted'}}>
                                        <Typography
                                            variant="h5"
                                            align='center'
                                            sx={{py:1, color:'blue'}}
                                        >
                                            持ち物リスト
                                        </Typography>
                                        <Grid container sx={content.buggages.length > 0 ? {borderTop: 1} : {}}>
                                            {content.buggages.map((buggage: any, index: number) => {
                                                return (
                                                    <Grid item xs={6} key={index}>
                                                        <Typography
                                                            variant="body1"
                                                            align='left'
                                                            sx={{
                                                                p: 1.5,
                                                                ...(index % 2 === 0 ? {borderRight: 1} : {})
                                                            }}
                                                        >
                                                            {buggage.name}
                                                        </Typography>
                                                    </Grid>
                                                );
                                            })}
                                        </Grid>
                                    </Box>
                                </Paper>

                                <Paper elevation={3} sx={{p:2, mt:3, borderRadius: 4}}>
                                    {content.schedules.map((schedule: any, index: number) => {
                                        return (
                                            <div key={index}>
                                                <Typography variant="h5" align='center' sx={{border: 'dotted', p:1}}>
                                                    DAY {schedule.day}
                                                </Typography>
                                                <Timeline>
                                                    {schedule.scheduleDetails.map((scheduleDetail: any, detailIndex: number) => {
                                                        return (
                                                            <ViewDistinationPage
                                                                key={detailIndex}
                                                                isLast={schedule.scheduleDetails.length - 1 === detailIndex}
                                                                detailIndex={detailIndex}
                                                                scheduleDetails={schedule.scheduleDetails}
                                                                scheduleDetail={scheduleDetail}
                                                            />
                                                        )
                                                    })}
                                                </Timeline>
                                            </div>
                                        )
                                    })}
                                </Paper>

                                <Paper elevation={3} sx={{p:2, mt:3, borderRadius: 4}}>
                                    <Box sx={{border: 'dotted'}}>
                                        <Typography variant="h5" align='center' sx={{py:1, color:'green'}}>
                                            買い物リスト
                                        </Typography>
                                        {content.shoppingLists.map((shoppingList: any, index: number) => {
                                            return (
                                                <>
                                                    <Grid container sx={{borderTop: 1, py: 1, pl: 1.5, height: '54px'}} key={index}>
                                                        <Grid item xs={11}>
                                                            <Typography variant="body1" sx={{mt:1}}>
                                                                {shoppingList.name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={1}>
                                                            {shoppingList.memo !== '' && (
                                                                <Button
                                                                    type="button"
                                                                    onClick={() => handleDisplayButton(index)}
                                                                >
                                                                    {displayList[index]?.isDisplay ? (
                                                                        <> ー </>
                                                                    ) : (
                                                                        <> ＋ </>
                                                                    )}
                                                                </Button>
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                    {displayList[index]?.isDisplay && (
                                                        <Typography variant="body1" sx={{py: 1, pl: 1.5}}>
                                                            メモ：
                                                            <div
                                                                dangerouslySetInnerHTML={{
                                                                    __html: textToLink(shoppingList.memo)
                                                                }}
                                                            />
                                                        </Typography>
                                                    )}
                                                </>
                                            )
                                        })}
                                    </Box>
                                </Paper>

                                <Paper elevation={3} sx={{p:2, my:3, borderRadius: 4}}>
                                    <Box sx={{border: 'dotted'}}>
                                        <Typography variant="h5" align='center' sx={{py:1}}>
                                            旅行後の感想
                                        </Typography>
                                        {content.thought !== "" && (
                                            <Typography variant="body1" sx={{p: 1.5, borderTop: 1, minHeight: "200px"}}>
                                                {content.thought}
                                            </Typography>
                                        )}
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper elevation={3} sx={{p:2, mt:3, borderRadius: 4}}>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <Avatar
                                                src={content.imagePath}
                                                sx={{ width: 56, height: 56 }}
                                            />
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography align='center' sx={{border: 'dotted', ml: 2, py:0.5}}>
                                                {content.userName}
                                            </Typography>
                                            <Typography align='left' variant='body2' sx={{ml: 2, py:1}}>
                                                @{content.name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>

                                <Paper elevation={3} sx={{p:2, mt:3, borderRadius: 4}}>
                                    <Typography variant="h5" align='center' sx={{py:1}}>
                                        出発地
                                    </Typography>
                                    <Box sx={{border: 1}}>
                                        <Grid container spacing={6} justifyContent="center" alignItems="center" sx={{py: 1}}>
                                            <Grid item xs='auto'>
                                                {content.depatureCountry}
                                            </Grid>
                                            <Grid item xs='auto'>
                                                {content.depaturePrefecture}
                                            </Grid>
                                            <Grid item xs='auto'>
                                                {content.depatureCity}
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    {content.schedules.map((schedule: any, index: number) => {
                                        return (
                                            <div key={index}>
                                                <Typography variant="h3" align='center' sx={{pt:1}}>
                                                    ⬇︎
                                                </Typography>
                                                <Typography variant="h5" align='center' sx={{pt:1}}>
                                                    DAY {schedule.day}
                                                </Typography>
                                                {schedule.travelArea.map((area: any, travelAreaIndex: number) => {
                                                    return (
                                                        <Box sx={{border: 1, mt: 1}} key={travelAreaIndex}>
                                                            <Grid container spacing={6} justifyContent="center" alignItems="center" key={travelAreaIndex} sx={{py: 1}}>
                                                                <Grid item xs='auto'>
                                                                    {area.country}
                                                                </Grid>
                                                                <Grid item xs='auto'>
                                                                    {area.prefecture}
                                                                </Grid>
                                                                <Grid item xs='auto'>
                                                                    {area.city}
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })}
                                </Paper>
                            </Grid>
                        </Grid>
                    )}
                </Container>
            </ThemeProvider>
        </GenericTemplate>
    );
}

export default ViewContentDetailPage