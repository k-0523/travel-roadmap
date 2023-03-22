import React, { useContext, useMemo }  from 'react';
import { AppContext } from '../../../../reducers/contents/contents';

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Title: React.VFC<{index: number, detailIndex: number}> = ({index, detailIndex}) => {
    const itemName = 'Schedule[' + index + '].ScheduleDetail[' + detailIndex + ']'
    const { dispatch, errorObject } = useContext(AppContext)

    return useMemo(() => {
        return (
            <Box sx={{mt: 2}}>
                <Grid container sx={{px:1}}>
                    <Grid item xs={1}>
                        <Typography variant="subtitle1" sx={{mt:1}}>
                            ・タイトル
                        </Typography>
                        {errorObject.hasOwnProperty(itemName + '.Title') && (
                            <Typography variant="subtitle2" style={{ color: "red" }}>
                                タイトルは{errorObject[itemName + '.Title']}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={11}>
                        <TextField
                            required
                            fullWidth
                            name="title"
                            placeholder='入力'
                            onChange={
                                (e) => dispatch({
                                    type: 'change_schedule_details_value',
                                    payload: {
                                        name: e.target.name,
                                        value: e.target.value,
                                        index: index,
                                        detailIndex: detailIndex
                                    }
                                })
                            }
                        />
                    </Grid>
                </Grid>
            </Box>
        );
    }, [dispatch, errorObject]);
}

export default Title