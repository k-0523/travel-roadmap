import React, { useContext, useState, useMemo, useEffect } from 'react';
import { AppContext } from '../../../reducers/contents/contents';
import Destination from './schedules/Destination';
import Area from './Area';

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const Schedule: React.VFC = () => {
    const { state, dispatch } = useContext(AppContext);
    const [dayDisplayList, setDayDisplayList] = useState<{isDisplay: boolean}[]>([]);

    const handleDayDisplayButton = (index: number) => {
        setDayDisplayList([
            ...dayDisplayList.slice(0, index),
            {
                ...dayDisplayList[index],
                isDisplay: !dayDisplayList[index].isDisplay
            },
            ...dayDisplayList.slice(index + 1)
        ])
    }

    useEffect(() => {
        let displays: {isDisplay: boolean}[] = [];
        state.schedules.map((_) => {
            displays.push({isDisplay: true})
        });
        setDayDisplayList(displays);
    },[]);

    return useMemo(() => {
        return (
            <Box sx={{ mt: 3 }}>
                {dayDisplayList.length === state.schedules.length && (
                    <Box sx={{ mt: 1.5 }}>
                        <Typography variant="subtitle1">
                            ◎旅行のスケジュール
                        </Typography>
                        {state.schedules.map((schedule, index) => {
                            return (
                                <Box sx={{border: 1}}>
                                    <Typography variant="h5" sx={{ mt: 1.5, borderBottom: 1 }}>
                                        <Grid container>
                                            <Grid item xs={5}>
                                                <Grid container justifyContent="flex-start" sx={{ pb: 1, pl: 1.5 }}>
                                                    <Grid item>
                                                        <Button
                                                            type="button"
                                                            variant="text"
                                                            color='inherit'
                                                            onClick={() => {handleDayDisplayButton(index)}}
                                                        >
                                                        {dayDisplayList[index].isDisplay ? (
                                                            <> ー </>
                                                        ) : (
                                                            <> ＋ </>
                                                        )}
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Grid container justifyContent="flex-start" sx={{ pb: 1 }}>
                                                    <Grid item>
                                                        Day {schedule.day}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Typography>
                                    <Box>
                                        <Area index={index}/>
                                    </Box>
                                    {dayDisplayList[index].isDisplay && (
                                        <Destination index={index} day={schedule.day} />
                                    )}
                                </Box>
                            );
                        })}
                        <Button
                            type="button"
                            fullWidth
                            variant="outlined"
                            color='inherit'
                            sx={{ mt: 2 }}
                            onClick={
                                () => {
                                    setDayDisplayList([...dayDisplayList, {isDisplay: true}]);
                                    dispatch({
                                        type: 'add_schedules',
                                        payload: {index: state.schedules.length}
                                    });
                                }
                            }
                        >
                            ＋DAY追加
                        </Button>
                    </Box>
                )}
            </Box>
        );
    }, [dispatch, dayDisplayList]);
}

export default Schedule