import { InputBase } from '@material-ui/core';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import { useHistory, useLocation } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { FETCH_BY_SEARCH } from '../actions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    search: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#f3f3f3',
        '&:hover': {
            backgroundColor: '#efefef',
        },
        '&:focus': {
            backgroundColor: '#efefef',
        },
        width: '80%',
        margin: '0px auto',
    },
    searchIcon: {
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 2,
    },
    inputRoot: {
        color: 'inherit',
        width: '88%',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: '10px',
        width: '100%',
        color: '#797979',
        '&:hover': {
            color: '#292929',
        },
    },
    iconButton: {
        padding: 0,
    },
}));

const StyledIcon = styled(SearchIcon)`
    color: #888c8c;
    width: 1.3em !important;
    height: 1.3em !important;
    padding-left: 10px;
`;

const Wrapper = styled.div`
    padding-top: 90px;
    padding-bottom: 10px;
    width: 100%;
    background: #4a4747;
`;

export const SearchMobile: React.FC = React.memo(function Search() {
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();
    const classes = useStyles();
    const location = useLocation();

    const isShouldHide = useMemo(() => location.pathname.includes('account'), [location.pathname]);

    const history = useHistory();

    const handleSearch = useCallback(() => {
        if (searchValue) {
            dispatch(FETCH_BY_SEARCH.TRIGGER(searchValue));
            setSearchValue('');
            history.push('/search-result');
        }
    }, [searchValue, dispatch, history]);

    const handleKeyDown = useCallback(
        (event) => {
            if (event.key === 'Enter') {
                handleSearch();
            }
        },
        [handleSearch]
    );

    if (isShouldHide) {
        return null;
    }

    return (
        <Wrapper>
            <div className={classes.search}>
                <IconButton onClick={handleSearch} className={classes.iconButton} aria-label="search">
                    <StyledIcon />
                </IconButton>
                <InputBase
                    onKeyDown={handleKeyDown}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Поиск..."
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
        </Wrapper>
    );
});
