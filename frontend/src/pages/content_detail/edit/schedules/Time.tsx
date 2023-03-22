import React, { useContext, useState, useMemo }  from 'react';
import { AppContext } from '../../../../reducers/contents/contents';
import { Hour, HourArray, Minutes, MinutesArray } from '../../../../utils/contents/time';

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Time: React.VFC<{index: number, detailIndex: number}>= ({index, detailIndex}) => {
    const itemName = 'Schedule[' + index + '].ScheduleDetail[' + detailIndex + ']'
    const { state, dispatch, errorObject } = useContext(AppContext)

    const [hour, setHour] = useState('');
    const [minutes, setMinutes] = useState('');

    const setTime = (e: SelectChangeEvent) => {
        switch (e.target.name) {
            case "hour":
                return dispatch({
                    type: 'change_schedule_details_value',
                    payload: {
                        name: 'time',
                        value: minutes === ''  ? '' : e.target.value + ':' + minutes,
                        index: index,
                        detailIndex: detailIndex
                    }
                });
            case "minutes":
                return dispatch({
                    type: 'change_schedule_details_value',
                    payload: {
                        name: 'time',
                        value: hour === '' ? '' : hour + ':' + e.target.value,
                        index: index,
                        detailIndex: detailIndex
                    }
                });
        };
    };

    const handleChangeHour = (e: SelectChangeEvent) => {
        setHour(e.target.value);
        setTime(e);
      };

      const handleChangeMinutes = (e: SelectChangeEvent) => {
        setMinutes(e.target.value);
        setTime(e);
      };

    return (
        <Box sx={{ mt: 2 }}>
            <Grid container spacing={1}>
                <Grid item xs={3}></Grid>
                <Grid item xs={2}>
                    ・時　刻
                    {errorObject.hasOwnProperty(itemName + '.Time') && (
                        <Typography variant="subtitle2" style={{ color: "red" }}>
                            {errorObject[itemName + '.Time']}
                        </Typography>
                    )}
                </Grid>
                <Grid item xs={6}>
                    <Grid container justifyContent="flex-start">
                        <Grid item xs={4}>
                            <Select
                                sx={{ width: '90%', height: '50%', backgroundColor: 'white' }}
                                style={{ fontSize: '15px' }}
                                name="hour"
                                defaultValue={state.schedules[index].scheduleDetails[detailIndex].time.substring(0,2)}
                                onChange={handleChangeHour}
                            >
                                { HourArray.map((hour: Hour, index: number) => (
                                    <MenuItem key={index} value={hour.value}>{hour.label}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={1}>
                            時
                        </Grid>
                        <Grid item xs={4}>
                            <Select
                                sx={{ width: '90%', height: '50%', backgroundColor: 'white' }}
                                style={{ fontSize: '15px' }}
                                name="minutes"
                                defaultValue={state.schedules[index].scheduleDetails[detailIndex].time.substring(3,5)}
                                onChange={handleChangeMinutes}
                            >
                                <MenuItem value="0">
                                    選択
                                </MenuItem>
                                { MinutesArray.map((minutes: Minutes, index: number) => (
                                    <MenuItem key={index} value={minutes.value}>{minutes.label}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={1}>
                            分
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Time