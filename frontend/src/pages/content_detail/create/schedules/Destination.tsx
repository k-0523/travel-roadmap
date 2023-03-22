import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../../../../reducers/contents/contents';
import Time from './Time';
import Transportation from './Transportation';
import Title from './Title';
import Place from './Place';
import Url from './Url';
import Content from './Content';
import Image from './Image';

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const Destination: React.VFC<{index: number, day: number}> = ({index, day}) => {
    const { state, dispatch } = useContext(AppContext);
    const [destinationDisplayList, setDestinationDisplayList] = useState<{isDisplay: boolean}[]>([{isDisplay: true}]);

    const handleDestinationDisplayButton = (detailIndex: number) => {
        setDestinationDisplayList([
            ...destinationDisplayList.slice(0, detailIndex),
            {
                ...destinationDisplayList[detailIndex],
                isDisplay: !destinationDisplayList[detailIndex].isDisplay
            },
            ...destinationDisplayList.slice(detailIndex + 1)
        ])
    }
    return useMemo(() => {
        return (
            <Box sx={{ px: 3, py:2}}>
                {state.schedules[index].scheduleDetails.map((scheduleDetail, detailIndex) => {
                    return scheduleDetail.dataStatus === 0 && (
                        <Box key={detailIndex} sx={{mt: 1.5, border: 1}}>
                            <Grid container sx={destinationDisplayList[detailIndex].isDisplay ? { borderBottom: 1 } : {}}>
                                <Grid item xs={4}>
                                    <Grid container justifyContent="flex-start" sx={{ p: 1.5 }}>
                                        <Grid item>
                                            <Button
                                                type="button"
                                                variant="text"
                                                color='inherit'
                                                onClick={() => {handleDestinationDisplayButton(detailIndex)}}
                                            >
                                                {destinationDisplayList[detailIndex].isDisplay ? (
                                                    <> ー </>
                                                ) : (
                                                    <> ＋ </>
                                                )}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={8}>
                                    <Grid container justifyContent="flex-end" sx={{ p: 1.5 }}>
                                        <Grid item>
                                            <Button
                                                type="button"
                                                fullWidth
                                                color="error"
                                                variant="text"
                                                onClick={
                                                    () => {
                                                        setDestinationDisplayList([
                                                            ...destinationDisplayList.slice(0, detailIndex),
                                                            ...destinationDisplayList.slice(detailIndex + 1)
                                                        ]);
                                                        dispatch({
                                                            type: 'delete_schedule_details',
                                                            payload: {
                                                                detailIndex: detailIndex,
                                                                index: index
                                                            }
                                                        })
                                                    }
                                                }
                                            >
                                                削除
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Box sx={{ px: 2 }}>
                                {destinationDisplayList[detailIndex].isDisplay && (
                                    <>
                                        <Grid container sx={{mt:2}}>
                                            <Grid item xs={6}>
                                                <Time index={index} detailIndex={detailIndex} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Transportation index={index} detailIndex={detailIndex} />
                                            </Grid>
                                        </Grid>
                                        <Title index={index} detailIndex={detailIndex} />
                                        <Grid container sx={{mt:2}}>
                                            <Grid item xs={6}>
                                                <Place index={index} detailIndex={detailIndex} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Url index={index} detailIndex={detailIndex} />
                                            </Grid>
                                        </Grid>
                                        <Content index={index} detailIndex={detailIndex} />
                                        <Image index={index} detailIndex={detailIndex} />
                                    </>
                                )}
                            </Box>
                        </Box>
                    );
                })}
                <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    color='inherit'
                    sx={{ mt: 2, mb: 1, height: "100px" }}
                    onClick={
                        () => {
                            setDestinationDisplayList([...destinationDisplayList, {isDisplay: true}]);
                            dispatch({
                                type: 'add_schedule_details',
                                payload: {
                                    detailIndex: state.schedules[index].scheduleDetails.length,
                                    index: index,
                                    day: day
                                }
                            })
                        }
                    }
                >
                    ＋目的地追加
                </Button>
            </Box>
        );
    }, [dispatch, destinationDisplayList]);
}

export default Destination