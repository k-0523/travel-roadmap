import React, { useContext, useMemo }  from 'react';
import { AppContext } from '../../../reducers/contents/contents';

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const ShoppingList: React.VFC = () => {
    const { state, dispatch } = useContext(AppContext)

    return useMemo(() => {
        return (
            <Box sx={{mt:3}}>
                <Typography variant="subtitle1">
                    ◎買い物リスト
                </Typography>
                {state.shoppingLists.map((_, index: number) => {
                    return (
                        <Grid container key={index}>
                            <Grid item xs={5}>
                                <TextField
                                    sx={{ mt: 1 }}
                                    required
                                    fullWidth
                                    name="name"
                                    placeholder='入力'
                                    onChange={(e) => dispatch({
                                        type: 'update_shopping_list',
                                        payload: {value: e.target.value, name: e.target.name},
                                        index: index
                                    })}
                                />
                            </Grid>
                            <Grid item xs={7}>
                                <Grid container>
                                    <Grid item xs={2} sx={{mt:2.5, pl:8}}>
                                        メモ
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField
                                            sx={{ mt: 1 }}
                                            required
                                            fullWidth
                                            name="memo"
                                            placeholder='入力'
                                            onChange={(e) => dispatch({
                                                type: 'update_shopping_list',
                                                payload: {value: e.target.value, name: e.target.name},
                                                index: index
                                            })}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    );
                })}
                <Grid container>
                    <Grid item xs={5}>
                        <Button
                            type="button"
                            variant="outlined"
                            color='inherit'
                            fullWidth
                            sx={{ mt: 1, height: "56px", border: 'dotted' }}
                            onClick={() => dispatch({
                                type: 'add_new_shopping_list',
                                payload: '',
                                index: state.shoppingLists.length + 1
                            })}
                        >
                            ＋追加
                        </Button>
                    </Grid>
                    <Grid item xs={7}>
                        <Grid container>
                            <Grid item xs={2} sx={{mt:2.5, pl:8}}>
                                メモ
                            </Grid>
                            <Grid item xs={10}>
                                <Box sx={{ mt: 1, border: 'dotted', height: "56px" }}>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        );
    }, [state.shoppingLists]);
}

export default ShoppingList