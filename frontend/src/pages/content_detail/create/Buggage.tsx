import React, { useContext, useMemo }  from 'react';
import { AppContext } from '../../../reducers/contents/contents';

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const Buggage: React.VFC = () => {
    const { state, dispatch } = useContext(AppContext)

    return useMemo(() => {
        return (
            <Box sx={{width: "50%", mt: 3}}>
                <Typography variant="subtitle1">
                    ◎持ち物リスト
                </Typography>
                <Grid container>
                    {state.buggages.map((_, index: number) => {
                        return (
                            <Grid item xs={6} key={index} sx={{mt:1}}>
                                <TextField
                                    sx={{ width: '250px'}}
                                    required
                                    name="name"
                                    placeholder='入力'
                                    onChange={(e) => dispatch({
                                        type: 'update_buggage',
                                        payload: {value: e.target.value, name: e.target.name},
                                        index: index
                                    })}
                                />
                            </Grid>
                        );
                    })}
                    <Grid item xs={6} sx={{mt:1}}>
                        <Button
                            type="button"
                            variant="outlined"
                            color='inherit'
                            sx={{ width: '250px', border: 'dotted', height: '56px' }}
                            onClick={() => dispatch({
                                type: 'add_new_buggage',
                                payload: '',
                                index: state.buggages.length + 1
                            })}
                        >
                            ＋追加
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        );
    }, [state.buggages]);
}

export default Buggage