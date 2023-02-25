import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPage: React.FC = React.memo(function NotFoundPage() {
    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1);
  };
    const goHome = () => {
        navigate('/');
    };
    const StyledTitle = styled.h1`
        margin: 0px;
        font-size: 250px;
    `;
    const StyledDescription = styled.p`
        color: #f3f4f8;
        transform: translateY(-40px);
    `;
    const NotFoundDiv = styled.div`
        box-sizing: border-box;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100vh;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        background-color: #232323;
        color: #d2d4da;
        padding-top: 80px;
    `;
    const GoBackButton = styled.button`
        color: #fff;
        letter-spacing: 1px;
        border: 1px solid #fff;
        padding: 8px 21px;
        background: none;
        border-radius: 6px;
        font-size: 20px;
        margin-right: 10px;
        transition: 0.5s;
        cursor: pointer;
        &: hover {
            border: 1px solid #7aa0a1;
            background: #7aa0a1;
        }
    `;
    const GoHomeButton = styled.button`
        color: #7aa0a1;
        border: none;
        letter-spacing: 1px;
        padding: 8px 21px;
        background: none;
        margin-left: 10px;
        transition: 0.5s;
        cursor: pointer;
        font-size: 20px;
        border-bottom: 1px solid #7aa0a1;
        &: hover {
            color: #fff;
            border-bottom: 1px solid #fff;
        }
    `;
    return (
        <NotFoundDiv>
            <StyledTitle>404</StyledTitle>
            <StyledDescription>К сожалению вы перешли на страницу которой не существует.</StyledDescription>
            <div>
                <GoBackButton onClick={goBack}>Назад</GoBackButton>
                <GoHomeButton onClick={goHome}>Домой</GoHomeButton>
            </div>
        </NotFoundDiv>
    );
});

export default NotFoundPage;
