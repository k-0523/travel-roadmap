import React, { useContext, useMemo }  from 'react';
import { AppContext } from '../../../reducers/contents/contents';
import { AccompanyArray, TypeAccompany } from '../../../utils/contents/accompany';

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from "@mui/material/Grid";

const Accompany: React.VFC = () => {
    const { dispatch, errorObject } = useContext(AppContext);

    return useMemo(() => {
        return (
            <Box sx={{ mt: 2.5, width: "40%"}}>
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                        <Typography variant="subtitle1">
                            ◎同行者<span style={{ color: "red", paddingLeft: "10px", fontSize: "13px" }}>※必須</span>
                        </Typography>
                        {errorObject.hasOwnProperty('AccompanyPersonCategory') && (
                            <Typography variant="subtitle2" style={{ color: "red" }}>
                                同行者は{errorObject['AccompanyPersonCategory']}
                            </Typography>
                        )}
                        <Select
                            sx={{ width: '70%', height: '50%', backgroundColor: 'white' }}
                            style={{ fontSize: '15px' }}
                            name="accompanyPersonCategory"
                            defaultValue="0"
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
                            { AccompanyArray.map((accompany: TypeAccompany, index: number) => (
                                <MenuItem key={index} value={accompany.value}>{accompany.label}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="subtitle1">
                            ◎人数<span style={{ color: "red", paddingLeft: "10px", fontSize: "13px" }}>※必須</span>
                        </Typography>
                        {errorObject.hasOwnProperty('NumberOfPerson') && (
                            <Typography variant="subtitle2" style={{ color: "red" }}>
                                人数は{errorObject['NumberOfPerson']}
                            </Typography>
                        )}
                        <Select
                            sx={{ width: '65%', height: '50%', backgroundColor: 'white' }}
                            style={{ fontSize: '15px' }}
                            name="numberOfPerson"
                            defaultValue="0"
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
                            {[...Array(5)].map((_, i) => i + 1).map((number: number, index: number) => (
                                <MenuItem key={index} value={number}>{number}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
            </Box>
        );
    }, [dispatch, errorObject]);
}

export default Accompany