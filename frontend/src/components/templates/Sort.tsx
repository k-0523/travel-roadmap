import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { AccompanyArray, TypeAccompany } from '../../utils/contents/accompany';
import { CurrencyList, CurrencyArray } from '../../utils/contents/currency';
import { PrefectureArray, Prefecture } from '../../utils/contents/prefecture';
import { CountryArray, Country } from '../../utils/contents/country';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer"
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import TuneIcon from '@mui/icons-material/Tune';
import { Grid, Typography } from "@mui/material";

const Sort: React.VFC = () => {
    const [state, setState] = useState(false);
    const url = new URL(window.location.href);
    const [sortCreatedAt, setSortCreatedAt] = useState(url.searchParams.get('sortCreatedAt') || '選択');
    const [accompany, setAccompany] = useState(url.searchParams.get('accompany') || '選択');
    const [numberOfPerson, setNumberOfPerson] = useState(url.searchParams.get('numberOfPerson') || '選択');
    const [month, setMonth] = useState(url.searchParams.get('month') || '選択');
    const [nights, setNights] = useState(url.searchParams.get('nights') || '選択');
    const [days, setDays] = useState(url.searchParams.get('days') || '選択');
    const [currency, setCurrency] = useState(url.searchParams.get('currency') || '選択');
    const [country, setCountry] = useState(url.searchParams.get('country') || '選択');
    const [prefecture, setPrefecture] = useState(url.searchParams.get('prefecture') || '選択');
    const [city, setCity] = useState(url.searchParams.get('city') || '');
    const [fromBudget, setFromBudget] = useState(url.searchParams.get('fromBudget') || '');
    const [toBudget, setToBudget] = useState(url.searchParams.get('toBudget') || '');
    const navigate = useNavigate();

    const handleSort = () => {
        const searchParam =
            '?sortCreatedAt=' + (sortCreatedAt === '選択' ? '' : sortCreatedAt) +
            '&accompany=' + (accompany === '選択' ? '' : accompany) +
            '&numberOfPerson=' + (numberOfPerson === '選択' ? '' : numberOfPerson) +
            '&month=' + (month === '選択' ? '' : month) +
            '&nights=' + (nights === '選択' ? '' : nights) +
            '&days=' + (days === '選択' ? '' : days) +
            '&currency=' + (currency === '選択' ? '' : currency) +
            '&country=' + (country === '選択' ? '' : country) +
            '&prefecture=' + (prefecture === '選択' ? '' : prefecture) +
            '&city=' + (city === '選択' ? '' : city) +
            '&fromBudget=' + String(fromBudget) +
            '&toBudget=' + String(toBudget);
        navigate({
            pathname: "/content/list",
            search: searchParam
        });
    }

    const toggleDrawer = (open: boolean) => () => {
        setState(open);
    };

    const list = () => (
        <Box
          sx={{ width: 400, mt:2 }}
          role="presentation"
        >
            <Box sx={{mt:2, ml:3}}>
                <Typography sx={{ml:1}}>
                    並び順
                </Typography>
                <Select
                    sx={{ width: '120px', backgroundColor: 'white' }}
                    style={{ fontSize: '15px' }}
                    name="createdAt"
                    defaultValue={'desc'}
                    onChange={(e) => setSortCreatedAt(e.target.value)}
                >
                    <MenuItem value="選択">
                        選択
                    </MenuItem>
                    <MenuItem value="desc">
                        新着順
                    </MenuItem>
                    <MenuItem value="asc">
                        古い順
                    </MenuItem>
                </Select>
            </Box>
            <Box sx={{mt:2, ml:3}}>
                <Grid container>
                    <Grid item xs={5}>
                        <Typography sx={{ml:1}}>
                            同行者
                        </Typography>
                        <Select
                            sx={{ width: '120px', backgroundColor: 'white' }}
                            name="accompany"
                            defaultValue={accompany}
                            onChange={(e) => setAccompany(e.target.value)}
                        >
                            <MenuItem value="選択">
                                選択
                            </MenuItem>
                            { AccompanyArray.map((accompany: TypeAccompany, index: number) => (
                                <MenuItem key={index} value={accompany.value}>{accompany.label}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography sx={{ml:1}}>
                            人数
                        </Typography>
                        <Select
                            sx={{ width: '120px', backgroundColor: 'white' }}
                            name="numberOfPerson"
                            defaultValue={numberOfPerson}
                            onChange={(e) => setNumberOfPerson(e.target.value)}
                        >
                            <MenuItem value="選択">
                                選択
                            </MenuItem>
                            {[...Array(5)].map((_, i) => i + 1).map((number: number, index: number) => (
                                <MenuItem key={index} value={number}>{number}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{mt:2, ml:3}}>
                <Grid container>
                    <Grid item xs={5}>
                        <Typography sx={{ml:1}}>
                            旅行する月
                        </Typography>
                        <Select
                            sx={{ width: '120px', backgroundColor: 'white' }}
                            name="month"
                            defaultValue={month}
                            onChange={(e) => setMonth(e.target.value)}
                        >
                            <MenuItem value="選択">
                                選択
                            </MenuItem>
                            {[...Array(12)].map((_, i) => i + 1).map((number: number, index: number) => (
                                <MenuItem key={index} value={number}>{number}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={7} sx={{mt: 2.7}}>
                        <Select
                            sx={{ width: '60px', backgroundColor: 'white' }}
                            name="nights"
                            defaultValue={nights}
                            onChange={(e) => setNights(e.target.value)}
                        >
                            <MenuItem value="選択">
                                選択
                            </MenuItem>
                            {[...Array(10)].map((_, i) => i + 1).map((number: number, index: number) => (
                                <MenuItem key={index} value={number}>{number}</MenuItem>
                            ))}
                        </Select>
                        泊
                        <Select
                            sx={{ width: '60px', backgroundColor: 'white', ml: 2 }}
                            name="days"
                            defaultValue={days}
                            onChange={(e) => setDays(e.target.value)}
                        >
                            <MenuItem value="選択">
                                選択
                            </MenuItem>
                            {[...Array(10)].map((_, i) => i + 1).map((number: number, index: number) => (
                                <MenuItem key={index} value={number}>{number}</MenuItem>
                            ))}
                        </Select>
                        日
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{mt:2, ml:3}}>
                <Typography sx={{ml:1}}>
                    予算
                </Typography>
                <Select
                    sx={{ width: '120px', backgroundColor: 'white' }}
                    name="currency"
                    defaultValue={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                >
                    <MenuItem value="選択">
                        選択
                    </MenuItem>
                    { CurrencyArray.map((currency: CurrencyList, index: number) => (
                        <MenuItem key={index} value={currency.value}>{currency.label}</MenuItem>
                    ))}
                </Select>
            </Box>
            <Box sx={{mt:2, ml:3}}>
                <Grid container>
                    <Grid item xs={5}>
                        <TextField
                            sx={{width: '120px', backgroundColor: 'white'}}
                            name="fromBudget"
                            defaultValue={fromBudget}
                            placeholder='入力'
                            onChange={(e) => setFromBudget(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={1} sx={{mt:1.8}}>
                        ~
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            sx={{width: '120px', backgroundColor: 'white'}}
                            name="toBudget"
                            defaultValue={toBudget}
                            placeholder='入力'
                            onChange={(e) => setToBudget(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{mt:2, ml:3}}>
                <Typography sx={{ml:1}}>
                    旅行する地域
                </Typography>
                <Select
                    sx={{width: '120px', backgroundColor: 'white'}}
                    name="country"
                    defaultValue={country}
                    onChange={(e) => setCountry(e.target.value)}
                >
                    <MenuItem value="選択">
                        選択
                    </MenuItem>
                    { CountryArray.map((country: Country, index: number) => (
                        <MenuItem key={index} value={country.value}>{country.label}</MenuItem>
                    ))}
                </Select>
                <Grid container>
                    <Grid item xs={5} sx={{mt: 2.7}}>
                        <Select
                            sx={{width: '120px', backgroundColor: 'white'}}
                            name="prefecture"
                            defaultValue={prefecture}
                            onChange={(e) => setPrefecture(e.target.value)}
                        >
                            <MenuItem value="選択">
                                選択
                            </MenuItem>
                            { PrefectureArray.map((prefecture: Prefecture, index: number) => (
                                <MenuItem key={index} value={prefecture.value}>{prefecture.label}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={5} sx={{mt: 2.7}}>
                        <TextField
                            sx={{width: '120px', backgroundColor: 'white'}}
                            name="city"
                            defaultValue={city}
                            placeholder='入力'
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Button
                onClick={() => handleSort()}
                sx={{ width: '80%', mt: 4, ml: 5 }}
                variant="contained"
            >
                設定
            </Button>
        </Box>
    );

    return (
        <>
            <Button
                onClick={toggleDrawer(true)}
                style={{position:'fixed', bottom:'60px', right:'100px'}}
                sx={{border: 1, borderRadius: 2, color: 'gray'}}
            >
                <TuneIcon fontSize='large' sx={{ color: 'black' }} />
            </Button>
            <Drawer
                anchor='right'
                open={state}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </>
    );
};

export default Sort;