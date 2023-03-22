import React, { useContext, useMemo }  from 'react';
import { AppContext } from '../../../reducers/contents/contents';
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Thoughts: React.VFC = () => {
    const { dispatch } = useContext(AppContext)
    return useMemo(() => {
        return (
            <Box sx={{width: "50%", mt:3}}>
                <Typography variant="subtitle1">
                    ◎旅行後の感想
                </Typography>
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={4}
                    name="thought"
                    placeholder="入力"
                    style={{ width: '100%', textAlign: 'left', padding: '10px' }}
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
    }, [dispatch]);
}

export default Thoughts