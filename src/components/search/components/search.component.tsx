import { InputBase } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './search.style.scss';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch, useSelector } from 'react-redux';

import { StyledButton } from '../../../ui/new-styled';
import { StyledIcons } from '../../../ui/styled-icon.component';
import { getSearchTermsState } from '../selectors';

const useStyles = makeStyles((theme) => ({
    search2: {
        boxSizing: 'border-box',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#f3f3f3',
        '&:hover': {
            backgroundColor: '#efefef',
        },
        '&:focus': {
            backgroundColor: '#efefef',
        },
        marginLeft: 0,
        width: '80%',
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
        },
    },
    inputRootSecond: {
        color: 'inherit',
        width: '95%',
    },
    iconButton: {
        padding: 10,
        '@media (max-width: 1180px)': {
            padding: 0,
        },
    },
    inputInputSecond: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: '1em',
        transition: theme.transitions.create('width'),
        width: '100%',
        color: '#797979',
        '&:focus': {
            color: '#292929',
        },
    },
}));

export const Search: React.FC = React.memo(function Search() {
    const [animationName, setAnimationName] = useState('slide-hide');
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();
    const classes = useStyles();
    const savedSearchTermsState = useSelector(getSearchTermsState);

    const searchRef = useRef<HTMLHeadingElement>(null);

    const openSearch = useCallback(() => {
        setAnimationName('slide');

        if (searchRef.current) {
            searchRef.current.focus();
        }
    }, [animationName, searchRef.current]);

    const history = useHistory();

    useEffect(() => {
        return history.listen((location) => {
            if (history.action === 'PUSH') {
                setAnimationName('slide-hide');
            }

            if (history.action === 'POP') {
                setAnimationName('slide-hide');
            }
        });
    }, []);

    const handleSearch = useCallback(() => {
        if (searchValue) {
            setSearchValue('');
            setAnimationName('slide-hide');

            history.push({
                pathname: '/search',
                search: "?" + new URLSearchParams({ searchTerms: searchValue }).toString()
            })
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

    return (
        <>
            <StyledIcons size={27} onClick={openSearch} className="icon-search" />
            <div className={animationName} style={{ boxSizing: 'border-box' }}>
                <div className={classes.search2}>
                    <IconButton onClick={handleSearch} className={classes.iconButton} aria-label="search">
                        <span className="icon-search" />
                    </IconButton>
                    <InputBase
                        onKeyDown={handleKeyDown}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        autoFocus={true}
                        placeholder="Поиск..."
                        classes={{
                            root: classes.inputRootSecond,
                            input: classes.inputInputSecond,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <StyledButton
                    isSecondary
                    additionalStyles={{ width: '150px' }}
                    onClick={() => setAnimationName('slide-hide')}
                    label="Отмена"
                />
            </div>
            <div className={`blur-bg-${animationName}`}></div>
        </>
    );
});
