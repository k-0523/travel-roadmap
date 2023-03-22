import React, { useContext, useMemo, useState, useEffect }  from 'react';
import { AppContext } from '../../../reducers/contents/contents';

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Title: React.VFC = () => {
    const { state, dispatch, errorObject } = useContext(AppContext)
	return useMemo(() => {
        return (
            <Box sx={{height: 100, mt:5}}>
                <Typography variant="subtitle1">
                    ◎タイトル<span style={{ color: "red", paddingLeft: "10px", fontSize: "13px" }}>※必須</span>
                </Typography>
                {errorObject.hasOwnProperty('Title') && (
                    <Typography variant="subtitle2" style={{ color: "red" }}>
                        タイトルは{errorObject['Title']}
                    </Typography>
                )}
                <TextField
                    required
                    fullWidth
                    id="title"
                    name="title"
                    defaultValue={state.title}
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
            </Box>
        );
    }, [dispatch, errorObject]);
}

export default Title