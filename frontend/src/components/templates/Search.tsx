import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import Input from "@mui/material/Input";

const Search: React.VFC = () => {
    const url = new URL(window.location.href);
    const [keyword, setKeyword] = useState(url.searchParams.get('keyword') || '');
    const navigate = useNavigate();

    const actionSearch = () => {
        navigate({
            pathname: "/content/search",
            search: '?keyword=' + keyword
        });
      }

    const enterListener = (e: any) => {
        if(e.key === 'Enter') {
            e.preventDefault()
            actionSearch()
        }
    }

    return (
        <Input
            defaultValue={keyword}
            placeholder="検索"
            sx={{border: 'dotted', flexGrow: 0.8, mx:'20%', px:1}}
            disableUnderline={true}
            onKeyPress={enterListener}
            onChange={(e) => setKeyword(e.target.value)}
        />
    );
};

export default Search;