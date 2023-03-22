import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../../reducers/contents/contents';
import { PrefectureArray, Prefecture } from '../../../utils/contents/prefecture';
import { CountryArray, Country } from '../../../utils/contents/country';

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Area: React.VFC<{index: number}> = ({index}) => {
    const { state, dispatch, errorObject } = useContext(AppContext);

    return useMemo(() => {
        return (
            <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" sx={{ml:2}}>
                    旅行する地域
                </Typography>
                <Grid container>
                    {state.schedules[index].travelArea.map((area, travelAreaIndex) => {
                        return (
                            <Grid item xs={6} key={travelAreaIndex} sx={{px:2.5}}>
                                <Grid container spacing={1} sx={{ mt: 1, ml: 0.1 }}>
                                    <Grid item xs={1} sx={{ border: 1 }}>
                                        <Box sx={{ my: 2 }}>
                                            {travelAreaIndex + 1}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={3.6} sx={{ py: 1, borderTop: 1, borderBottom: 1 }}>
                                        <Select
                                            sx={{ width: '100%', backgroundColor: 'white' }}
                                            style={{ fontSize: '15px' }}
                                            name="country"
                                            defaultValue={'選択'}
                                            onChange={
                                                (e) => dispatch({
                                                    type: 'change_travel_area',
                                                    payload: {
                                                        name: e.target.name,
                                                        value: e.target.value,
                                                        index: index,
                                                        travelAreaIndex: travelAreaIndex
                                                    }
                                                })
                                            }
                                        >
                                            <MenuItem value="選択">
                                                選択
                                            </MenuItem>
                                            { CountryArray.map((country: Country, index: number) => (
                                                <MenuItem key={index} value={country.value}>{country.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>

                                    <Grid item xs={3.6} sx={{ py: 1, borderTop: 1, borderBottom: 1 }}>
                                        <Select
                                            sx={{ width: '100%', backgroundColor: 'white' }}
                                            style={{ fontSize: '15px' }}
                                            name="prefecture"
                                            defaultValue={'選択'}
                                            onChange={
                                                (e) => dispatch({
                                                    type: 'change_travel_area',
                                                    payload: {
                                                        name: e.target.name,
                                                        value: e.target.value,
                                                        index: index,
                                                        travelAreaIndex: travelAreaIndex
                                                    }
                                                })
                                            }
                                        >
                                            <MenuItem value="選択">
                                                選択
                                            </MenuItem>
                                            { PrefectureArray.map((prefecture: Prefecture, index: number) => (
                                                <MenuItem key={index} value={prefecture.value}>{prefecture.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>

                                    <Grid
                                        item
                                        xs={3.6}
                                        sx={{
                                            py: 1,
                                            pr: 0.5,
                                            borderTop: 1,
                                            borderBottom: 1,
                                            borderRight: 1
                                        }
                                    }>
                                        <TextField
                                            sx={{ width: '100%' }}
                                            style={{ fontSize: '15px' }}
                                            name="city"
                                            placeholder='入力'
                                            onChange={
                                                (e) => dispatch({
                                                    type: 'change_travel_area',
                                                    payload: {
                                                        name: e.target.name,
                                                        value: e.target.value,
                                                        index: index,
                                                        travelAreaIndex: travelAreaIndex
                                                    }
                                                })
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    })}
                    <Grid item xs={6}>
                        <Button
                            type="button"
                            variant="outlined"
                            color='inherit'
                            sx={{ width: '460px', height: '75px', mt:1, ml:2.4 }}
                            onClick={() => dispatch({
                                type: 'add_travel_area',
                                payload: {
                                    index: index,
                                    travelAreaIndex: state.schedules[index].travelArea.length + 1
                                }
                            })}
                        >
                            ＋追加
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        );
    }, [dispatch, errorObject, state.schedules[index].travelArea]);
}

export default Area