import React, { useContext, useState, useEffect }  from 'react';
import { AppContext } from '../../../reducers/contents/contents';
import { YearArray, Year, MonthArray, Month, DayArray, Day} from '../../../utils/contents/date';

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const TravelPeriod: React.VFC = () => {
    const { state, dispatch, errorObject } = useContext(AppContext);

    const [fromYear, setFromYear] = useState(state.fromDate.substring(0,4));
    const [fromMonth, setFromMonth] = useState(state.fromDate.substring(5,7));
    const [fromDay, setFromDay] = useState(state.fromDate.substring(8,10));

    const [toYear, setToYear] = useState(state.toDate.substring(0,4));
    const [toMonth, setToMonth] = useState(state.toDate.substring(5,7));
    const [toDay, setToDay] = useState(state.toDate.substring(8,10));

    // 日付を整形してからdispatch
    const setFromDate = (e: any) => {
        switch (e.target.name) {
            case "fromYear":
                if (fromMonth === '' || fromDay === '') return;
                if (Number(e.target.value) === 0) return dispatch({type: 'change_value', payload: {name: "fromDate", value: ''}});
                return dispatch({type: 'change_value', payload: {name: "fromDate", value: e.target.value + '-' + fromMonth + '-' + fromDay}});
            case "fromMonth":
                if (fromYear === '' || fromDay === '') return;
                if (Number(e.target.value) === 0) return dispatch({type: 'change_value', payload: {name: "fromDate", value: ''}});
                return dispatch({type: 'change_value', payload: {name: "fromDate", value: fromYear + '-' + e.target.value + '-' + fromDay}});
            case "fromDay":
                if (fromYear === '' || fromMonth === '') return;
                if (Number(e.target.value) === 0) return dispatch({type: 'change_value', payload: {name: "fromDate", value: ''}});
                return dispatch({type: 'change_value', payload: {name: "fromDate", value: fromYear + '-' + fromMonth + '-' + e.target.value}});
        };
    };

    // 日付を整形してからdispatch
    const setToDate = (e: any) => {
        switch (e.target.name) {
            case "toYear":
                if (toMonth === '' || toDay === '') return;
                if (Number(e.target.value) === 0) return dispatch({type: 'change_value', payload: {name: "toDate", value: ''}});
                return dispatch({type: 'change_value', payload: {name: "toDate", value: e.target.value + '-' + toMonth + '-' + toDay}});
            case "toMonth":
                if (toYear === '' || toDay === '') return;
                if (Number(e.target.value) === 0) return dispatch({type: 'change_value', payload: {name: "toDate", value: ''}});
                return dispatch({type: 'change_value', payload: {name: "toDate", value: toYear + '-' + e.target.value + '-' + toDay}});
            case "toDay":
                if (toYear === '' || toMonth === '') return;
                if (Number(e.target.value) === 0) return dispatch({type: 'change_value', payload: {name: "toDate", value: ''}});
                return dispatch({type: 'change_value', payload: {name: "toDate", value: toYear + '-' + toMonth + '-' + e.target.value}});
        };
    };

    useEffect(() => {
        dispatch({type: 'change_value', payload: {name: "fromDate", value: state.fromDate.substring(0,10)}});
        dispatch({type: 'change_value', payload: {name: "toDate", value: state.toDate.substring(0,10)}});
    },[]);

    const handleChangeFromYear = (e: any) => {
        setFromYear(e.target.value);
        setFromDate(e);
      };

    const handleChangeFromMonth = (e: any) => {
        setFromMonth(e.target.value);
        setFromDate(e);
    };

    const handleChangeFromDay = (e: any) => {
        setFromDay(e.target.value);
        setFromDate(e);
    };

    const handleChangeToYear = (e: any) => {
        setToYear(e.target.value);
        setToDate(e);
      };

    const handleChangeToMonth = (e: any) => {
        setToMonth(e.target.value);
        setToDate(e);
    };

    const handleChangeToDay = (e: any) => {
        setToDay(e.target.value);
        setToDate(e);
    };

    return (
        <Box sx={{ mt: 1 }}>
            <Typography variant="subtitle1">
                ◎旅行期間<span style={{ color: "red", paddingLeft: "10px", fontSize: "13px" }}>※必須</span>
            </Typography>
            {errorObject.hasOwnProperty('FromDate') && (
                <Typography variant="subtitle2" style={{ color: "red" }}>
                    開始時期は{errorObject['FromDate']}
                </Typography>
            )}
            {errorObject.hasOwnProperty('ToDate') && (
                <Typography variant="subtitle2" style={{ color: "red" }}>
                    終了時期は{errorObject['ToDate']}
                </Typography>
            )}
                        <Grid container sx={{ mt: 1.5 }}>
                <Grid item xs={1}>
                    <Select
                        sx={{backgroundColor: 'white', width:"90px"}}
                        name="fromYear"
                        defaultValue={fromYear}
                        onChange={ (e) => handleChangeFromYear(e) }
                    >
                        <MenuItem value="0">
                            選択
                        </MenuItem>
                        { YearArray.map((year: Year, index: number) => (
                            <MenuItem key={index} value={year.value}>{year.label}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={1}>
                    <Select
                        sx={{backgroundColor: 'white', width:"90px"}}
                        name="fromMonth"
                        defaultValue={fromMonth}
                        onChange={ (e) => handleChangeFromMonth(e) }
                    >
                        <MenuItem value="0">
                            選択
                        </MenuItem>
                        { MonthArray.map((month: Month, index: number) => (
                            <MenuItem key={index} value={month.value}>{month.label}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={1}>
                        <Select
                            sx={{backgroundColor: 'white', width:"90px"}}
                            name="fromDay"
                            defaultValue={fromDay}
                            onChange={ (e) => handleChangeFromDay(e) }
                        >
                            <MenuItem value="0">
                                選択
                            </MenuItem>
                            { DayArray.map((day: Day, index: number) => (
                                <MenuItem key={index} value={day.value}>{day.label}</MenuItem>
                            ))}
                        </Select>
                </Grid>
                <Grid item xs={0.4} sx={{mt:2, ml:2}}>
                    ~
                </Grid>
                <Grid item xs={1}>
                    <Select
                        sx={{backgroundColor: 'white', width:"90px"}}
                        name="toYear"
                        defaultValue={toYear}
                        onChange={ (e) => handleChangeToYear(e) }
                    >
                        <MenuItem value="0">
                            選択
                        </MenuItem>
                        { YearArray.map((year: Year, index: number) => (
                            <MenuItem key={index} value={year.value}>{year.label}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={1}>
                    <Select
                        sx={{backgroundColor: 'white', width:"90px"}}
                        name="toMonth"
                        defaultValue={toMonth}
                        onChange={ (e) => handleChangeToMonth(e) }
                    >
                        <MenuItem value="0">
                            選択
                        </MenuItem>
                        { MonthArray.map((month: Month, index: number) => (
                            <MenuItem key={index} value={month.value}>{month.label}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={1}>
                    <Select
                        sx={{backgroundColor: 'white', width:"90px"}}
                        name="toDay"
                        defaultValue={toDay}
                        onChange={ (e) => handleChangeToDay(e) }
                    >
                        <MenuItem value="0">
                            選択
                        </MenuItem>
                        { DayArray.map((day: Day, index: number) => (
                            <MenuItem key={index} value={day.value}>{day.label}</MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>
        </Box>
    );
}

export default TravelPeriod