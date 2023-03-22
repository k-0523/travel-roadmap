import React, { useContext, useMemo }  from 'react';
import { AppContext } from '../../../../reducers/contents/contents';

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Content: React.VFC<{index: number, detailIndex: number}> = ({index, detailIndex}) => {
    const { state, dispatch } = useContext(AppContext)

    return useMemo(() => {
        return (
            <Box sx={{mt:4}}>
                <Grid container sx={{px:1}}>
                    <Grid item xs={1}>
                        <Typography variant="subtitle1" sx={{mt:1}}>
                            ・内容
                        </Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <TextField
                            required
                            fullWidth
                            name="content"
                            placeholder='入力'
                            defaultValue={state.schedules[index].scheduleDetails[detailIndex].content}
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
    }, [dispatch]);
}

export default Content