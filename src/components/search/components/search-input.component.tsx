import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';

const SearchInputWrapper = styled.div`
    display: flex;
    flex-grow: 1;
    position: relative;

    @media (max-width: 420px) {
        width: 100%;
    }
`;

const SearchButton = styled.button`
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #3b9b9d;
    color: white;
    font-family: 'Manrope';
    margin-left: -15px;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
    border: none;
`;


const SearchIcon = styled.span`
    color: #999696;
    font-size: 23px;

    position: absolute;
    top: 10px;
    left: 10px;
`;

const CleanIcon = styled.span`
    color: #c9c7c7;
    font-size: 23px;
    cursor: pointer;

	margin-left: -50px;
    margin-top: 10px;
    margin-right: 28px;
`;

const StyledInput = styled.input`
    border: 1px solid #cdcbcb;
    box-sizing: content-box;
    border-radius: 5px;
    width: 60%;
    height: 40px;
    padding-left: 50px;
    font-size: 14px;
    font-family: 'Manrope';
    background: #fff;

    &:focus {
        outline: none;
        border: 1px solid #b7b4b4;
        background: #f9f9f9;
    }
`;

export const SearchInput: React.FC = React.memo(function SearchInput() {
    const dispatch = useDispatch();
    const searchRef = useRef<HTMLInputElement>(null);
    const [showClearButton, setShowClearButton] = useState(false);

    const history = useHistory();

    const handleSearch = useCallback(() => {
        if (searchRef.current && searchRef.current.value.length > 0) {
            history.push({
                pathname: '/search',
                search: "?" + new URLSearchParams({ searchTerms: searchRef.current.value }).toString()
            })
        }
    }, [searchRef, dispatch, history]);

    const handleKeyDown = useCallback(
        (event) => {
            if (event.key === 'Enter') {
                handleSearch();
            }
        },
        [handleSearch]
    );


    const handleOnClear = useCallback(() => {
        if (searchRef.current && searchRef.current.value.length > 0) {
            searchRef.current.value = '';
			history.push('/catalog');
			setShowClearButton(false);
        }
    },[searchRef]);

	const handleOnBlure = useCallback(() => {
        if (searchRef.current && searchRef.current.value.length < 1) {
            setShowClearButton(false)
        }
    },[searchRef]);

    return (
        <SearchInputWrapper>
            <SearchIcon className="icon-search" />
            
            <StyledInput
                ref={searchRef}
                placeholder="Поиск..."
                onKeyDown={handleKeyDown}
				onFocus={() => setShowClearButton(true)}
				onBlur={handleOnBlure}
            />
			{
                showClearButton && <CleanIcon className="icon-cancel" onClick={handleOnClear} />
            }
            <SearchButton onClick={handleSearch}>Найти</SearchButton>
        </SearchInputWrapper>
    );
});
