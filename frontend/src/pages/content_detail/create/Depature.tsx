import React, { useContext, useMemo, useState } from 'react';
import { AppContext } from '../../../reducers/contents/contents';
import { PrefectureArray, Prefecture } from '../../../utils/contents/prefecture';
import { CountryArray, Country } from '../../../utils/contents/country';

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from "@mui/material/TextField";

const Depature: React.VFC = () => {
    const { dispatch, errorObject } = useContext(AppContext);
    return useMemo(() => {
        return (
            <Box sx={{width: "50%", mt: 3}}>
                <Typography variant="subtitle1">
                    ◎出発地<span style={{ color: "red", paddingLeft: "10px", fontSize: "13px" }}>※必須</span>
                </Typography>
                {errorObject.hasOwnProperty('DepatureCountry') && (
                    <Typography variant="subtitle2" style={{ color: "red" }}>
                        出発国は{errorObject['DepatureCountry']}
                    </Typography>
                )}
                {errorObject.hasOwnProperty('DepaturePrefecture') && (
                    <Typography variant="subtitle2" style={{ color: "red" }}>
                        出発都道府県は{errorObject['DepaturePrefecture']}
                    </Typography>
                )}
                {errorObject.hasOwnProperty('DepatureCity') && (
                    <Typography variant="subtitle2" style={{ color: "red" }}>
                        出発市は{errorObject['DepatureCity']}
                    </Typography>
                )}
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Select
                            sx={{ width: '100%', backgroundColor: 'white' }}
                            style={{ fontSize: '15px' }}
                            name="depatureCountry"
                            defaultValue={"選択"}
                            onChange={
                                (e) => dispatch({
                                    type: 'change_value',
                                    payload: {
                                        name: e.target.name,
                                        value: e.target.value
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

                    <Grid item xs={4}>
                        <Select
                            sx={{ width: '100%', backgroundColor: 'white' }}
                            style={{ fontSize: '15px' }}
                            name="depaturePrefecture"
                            defaultValue={"選択"}
                            onChange={
                                (e) => dispatch({
                                    type: 'change_value',
                                    payload: {
                                        name: e.target.name,
                                        value: e.target.value
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

                    <Grid item xs={4}>
                        <TextField
                            sx={{ width: '100%' }}
                            style={{ fontSize: '15px' }}
                            name="depatureCity"
                            placeholder='入力'
                            onChange={
                                (e) => dispatch({
                                    type: 'change_value',
                                    payload: {
                                        name: e.target.name,
                                        value: e.target.value
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

export default Depature