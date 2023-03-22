import React, { useContext, useMemo }  from 'react';
import { AppContext } from '../../../../reducers/contents/contents';
import { TransportationArray, TypeTransportation } from '../../../../utils/contents/transportation';

import Box from "@mui/material/Box";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";

const Transportation: React.VFC<{index: number, detailIndex: number}> = ({index, detailIndex}) => {
    const itemName = 'Schedule[' + index + '].ScheduleDetail[' + detailIndex + ']'
    const { state, dispatch, errorObject } = useContext(AppContext)

    return useMemo(() => {
        return (
            <Box sx={{ mt: 2 }}>
                <Grid container spacing={1}>
                    <Grid item xs={2.3}>
                        ・移動手段
                        {errorObject.hasOwnProperty(itemName + '.Transportation') && (
                            <Typography variant="subtitle2" style={{ color: "red" }}>
                                {errorObject[itemName + '.Transportation']}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={4}>
                        <Select
                            sx={{ width: '70%', height: '50%', backgroundColor: 'white' }}
                            style={{ fontSize: '15px' }}
                            name="transportation"
                            defaultValue={state.schedules[index].scheduleDetails[detailIndex].transportation}
                            onChange={(e) => dispatch({
                                type: 'change_schedule_details_value',
                                payload: {
                                    name: e.target.name,
                                    value: Number(e.target.value) === 0 ? null : Number(e.target.value),
                                    index: index,
                                    detailIndex: detailIndex
                                }
                            })}
                        >
                            <MenuItem value={0}>
                                選択
                            </MenuItem>
                            { TransportationArray.map((transportation: TypeTransportation, index: number) => (
                                <MenuItem key={index} value={transportation.value}>{transportation.label}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
            </Box>
        );
    }, [dispatch, errorObject]);
}

export default Transportation