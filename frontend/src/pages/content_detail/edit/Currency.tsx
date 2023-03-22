import React, { useContext, useMemo }  from 'react';
import { AppContext } from '../../../reducers/contents/contents';
import { CurrencyList, CurrencyArray } from '../../../utils/contents/currency';

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from "@mui/material/Grid";

const Currency: React.VFC = () => {
    const { state, dispatch, errorObject } = useContext(AppContext)

    return useMemo(() => {
        return (
            <Box sx={{ mt: 1, width: "40%"}}>
                <Typography variant="subtitle1">
                    ◎予算<span style={{ color: "red", paddingLeft: "10px", fontSize: "13px" }}>※必須</span>
                </Typography>
                {errorObject.hasOwnProperty('Budget') && (
                    <Typography variant="subtitle2" style={{ color: "red" }}>
                        予算は{errorObject['Budget']}
                    </Typography>
                )}
                {errorObject.hasOwnProperty('Currency') && (
                    <Typography variant="subtitle2" style={{ color: "red" }}>
                        通貨は{errorObject['Currency']}
                    </Typography>
                )}
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                        <TextField
                            required
                            sx={{ width: '90%' }}
                            style={{ fontSize: '15px' }}
                            id="budget"
                            name="budget"
                            defaultValue={state.budget}
                            placeholder='入力'
                            onChange={
                                (e) => dispatch({
                                    type: 'change_value',
                                    payload: {
                                        name: e.target.name,
                                        value: Number(e.target.value)
                                    }
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Select
                            sx={{ width: '100%', height: '100%', backgroundColor: 'white' }}
                            style={{ fontSize: '15px' }}
                            name="currency"
                            defaultValue={state.currency}
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
                            { CurrencyArray.map((currency: CurrencyList, index: number) => (
                                <MenuItem key={index} value={currency.value}>{currency.label}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
            </Box>
        );
    }, [dispatch, errorObject]);
}

export default Currency