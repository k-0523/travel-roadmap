import React, { useContext, useMemo }  from 'react';
import { AppContext } from '../../../reducers/contents/contents';

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from "@mui/material/Grid";

const Days: React.VFC = () => {
    const { state, dispatch, errorObject } = useContext(AppContext);

    return useMemo(() => {
        return (
            <Box sx={{ mt: 2.5, width: "40%"}}>
                <Typography variant="subtitle1">
                    ◎旅行日数<span style={{ color: "red", paddingLeft: "10px", fontSize: "13px" }}>※必須</span>
                </Typography>
                {errorObject.hasOwnProperty('Nights') && (
                    <Typography variant="subtitle2" style={{ color: "red" }}>
                        宿泊数は{errorObject['Nights']}
                    </Typography>
                )}
                {errorObject.hasOwnProperty('Days') && (
                    <Typography variant="subtitle2" style={{ color: "red" }}>
                        日数は{errorObject['Days']}
                    </Typography>
                )}
                <Grid container>
                    <Grid item xs={4}>
                        <Select
                            sx={{ width: '70%', height: '80%', backgroundColor: 'white' }}
                            style={{ fontSize: '15px' }}
                            name="nights"
                            defaultValue={state.nights}
                            onChange={
                                (e) => dispatch({
                                    type: 'change_value',
                                    payload: {
                                        name: e.target.name,
                                        value: Number(e.target.value)
                                    }
                                })
                            }
                        >
                            <MenuItem value="0">
                                選択
                            </MenuItem>
                            {[...Array(10)].map((_, i) => i + 1).map((number: number, index: number) => (
                                <MenuItem key={index} value={number}>{number}</MenuItem>
                            ))}
                        </Select>
                        <span style={{marginLeft: "10px"}}>
                            泊
                        </span>
                    </Grid>
                    <Grid item xs={4}>
                        <Select
                            sx={{ width: '70%', height: '80%', backgroundColor: 'white' }}
                            style={{ fontSize: '15px' }}
                            name="days"
                            defaultValue={state.days}
                            onChange={
                                (e) => dispatch({
                                    type: 'change_value',
                                    payload: {
                                        name: e.target.name,
                                        value: Number(e.target.value)
                                    }
                                })
                            }
                        >
                            <MenuItem value="0">
                                選択
                            </MenuItem>
                            {[...Array(10)].map((_, i) => i + 1).map((number: number, index: number) => (
                                <MenuItem key={index} value={number}>{number}</MenuItem>
                            ))}
                        </Select>
                        <span style={{marginLeft: "10px"}}>
                            日
                        </span>
                    </Grid>
                </Grid>
            </Box>
        );
    }, [dispatch, errorObject]);
}

export default Days