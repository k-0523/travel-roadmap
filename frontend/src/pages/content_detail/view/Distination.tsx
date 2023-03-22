import React, { useState, useEffect } from 'react';
import 'luminous-lightbox/dist/luminous-basic.min.css';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ImageListItem from "@mui/material/ImageListItem";
import Grid from "@mui/material/Grid";
import {
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineOppositeContent,
    TimelineDot
} from '@mui/lab';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import MapIcon from '@mui/icons-material/Map';

const LuminousGallery = require("luminous-lightbox").LuminousGallery
const ViewDistinationPage: React.VFC<{
    isLast: boolean,
    scheduleDetail: any,
    detailIndex: number,
    scheduleDetails: any
}> = ({
    isLast,
    scheduleDetail,
    detailIndex,
    scheduleDetails
}) => {
    const [isDisplay, setIsDisplay] = useState<boolean>(false);

    useEffect(() => {
        new LuminousGallery(document.querySelectorAll(".gallery-" + scheduleDetail.id), {arrowNavigation: true});
    }, []);

    const makeTransportationIcon = (transportation: number) => (
        <>
            {transportation === 1 && <DirectionsWalkIcon />}
            {transportation === 2 && <DirectionsCarIcon />}
            {transportation === 3 && <DirectionsSubwayIcon />}
            {transportation === 4 && <FlightIcon />}
            {transportation === 5 && <DirectionsBusIcon />}
        </>
    )

    return (
        <TimelineItem>
            <TimelineOppositeContent style={{ flex: 0.1 }}>
                <Typography variant="body2" color="textSecondary">
                    {scheduleDetail.time.slice(0, 5)}
                </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot sx={{ml:1.58}} />
                {!isLast && (
                        <>
                            <TimelineConnector />
                            <TimelineDot>
                                {makeTransportationIcon(scheduleDetails[detailIndex + 1]?.transportation)}
                            </TimelineDot>
                            <TimelineConnector />
                        </>
                    )
                }
            </TimelineSeparator>
            <TimelineContent>
                <Paper elevation={3} sx={!isLast ? {p: 1, mb:5} : {p: 1, ml: 1.5}}>
                    <Box sx={{border: 'dotted'}}>
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item xs={2}>
                                <Button
                                    type="button"
                                    onClick={() => setIsDisplay(!isDisplay)}
                                >
                                    {isDisplay ? (
                                        <> ー </>
                                    ) : (
                                        <> ＋ </>
                                    )}
                                </Button>
                            </Grid>
                            <Grid item xs={7}>
                                {scheduleDetail.title}
                            </Grid>
                            <Grid item xs={3} sx={{mt: 1, px:1}}>
                                {scheduleDetail.scheduleDetailImages.map((image: any, index: number) => {
                                    return image.signedUrl !== "" && (
                                        <a
                                            key={index}
                                            className={"gallery-" + scheduleDetail.id}
                                            href={`${image.signedUrl}`}
                                            style={index !== 0 ? {'display': 'none'} : {}}
                                        >
                                            <ImageListItem sx={{width: '60px', ml:5}}>
                                                <img src={`${image.signedUrl}`} />
                                            </ImageListItem>
                                        </a>
                                    )
                                })}
                            </Grid>
                        </Grid>
                    </Box>
                    {isDisplay && (
                        <>
                            <Grid container justifyContent="center" alignItems="center" sx={{p: 1, borderBottom: 1}}>
                                <Grid item xs={6}>
                                    <Typography align='left' sx={{my:1}}>
                                        場所 : {scheduleDetail.place}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography align='right'>
                                        <a href={`${scheduleDetail.url}`}>
                                            <MapIcon />
                                        </a>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography sx={{p: 1, mt: 1, minHeight: "200px"}}>
                                メモ : {scheduleDetail.content}
                            </Typography>
                        </>
                    )}
                </Paper>
            </TimelineContent>
        </TimelineItem>
    )
}

export default ViewDistinationPage