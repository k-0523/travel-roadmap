import React, { useContext, useMemo }  from 'react';
import { AppContext } from '../../../reducers/contents/contents';

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Precaution: React.VFC = () => {
    const { state, dispatch } = useContext(AppContext)

    return useMemo(() => {
        return (
            <Box sx={{width: "50%", mt: 3}}>
                <Typography variant="subtitle1">
                    ◎旅行の注意事項
                </Typography>
                {state.precautions.map((precaution, index: number) => {
                    return (
                        <TextField
                            sx={{ mt: 1 }}
                            key={index}
                            required
                            fullWidth
                            name="precaution"
                            defaultValue={precaution.precaution}
                            placeholder='入力'
                            onChange={
                                (e) => dispatch({
                                    type: 'update_precaution',
                                    payload: {value: e.target.value, name: e.target.name},
                                    index: index
                                })
                            }
                        />
                    );
                })}
                <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    color='inherit'
                    sx={{ mt: 1 }}
                    onClick={() => dispatch({
                        type: 'add_new_precaution',
                        payload: '',
                        index: state.precautions.length + 1
                    })}
                >
                    ＋追加
                </Button>
            </Box>
        );
    }, [state.precautions]);
}

export default Precaution