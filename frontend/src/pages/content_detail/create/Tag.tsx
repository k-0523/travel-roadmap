import React, { useContext, useMemo }  from 'react';
import { AppContext } from '../../../reducers/contents/contents';

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Tag: React.VFC = () => {
    const { dispatch, errorObject } = useContext(AppContext);

    const handleTags = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const tagList: Array<{ name: string }> = [];
        e.target.value.match(/#\S+/g)?.map((tag) => {
            tagList.push({ name: tag });
        });

        dispatch({
            type: 'change_value',
            payload: {
                name: e.target.name,
                value: tagList
            }
        })
    }

    return useMemo(() => {
        return (
            <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">
                    ◎ハッシュタグ<span style={{ color: "red", paddingLeft: "10px", fontSize: "13px" }}>※必須</span>
                </Typography>
                {errorObject.hasOwnProperty('Tag[0].Name') && (
                    <Typography variant="subtitle2" style={{ color: "red" }}>
                        ハッシュタグは{errorObject['Tag[0].Name']}
                    </Typography>
                )}
                <TextField
                    required
                    fullWidth
                    id="tags"
                    name="tags"
                    placeholder='入力'
                    onChange={(e) => handleTags(e)}
                />
            </Box>
        );
    }, [dispatch, errorObject]);
}

export default Tag