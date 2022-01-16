import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { BodyText, BodyLink, TextColor, TextSize, TextWeight } from '../../../ui/text';
import { AlertModal } from '../../../ui/modals/alert-modal';

const Wrapper = styled.div`
    display: flex;
    min-width: 60px;
`;

const LocationText = styled(BodyText).attrs({ size: TextSize.EXTRA_EXTRA_SMALL, weight: TextWeight.BOLD })`
    padding: 1px 0;
    margin-right: 10px;
    font-family: 'PLAY';
`;

export const Location: React.FC = React.memo(function Location() {
    const [currentLocation, setCurrentLocation] = useState('Минск');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log('Latitude is :', position.coords.latitude);
            console.log('Longitude is :', position.coords.longitude);

            getCity([position.coords.latitude, position.coords.longitude]);
        });
    }, []);

    useEffect(() => {
        if (currentLocation.length > 1 && currentLocation !== 'Выберите свой город') {
            // TURN ON (true)
            setShowModal(false);
        }
    }, [currentLocation]);

    const handleRejectModal = useCallback(() => {
        setShowModal(false);
        setCurrentLocation('Выберите свой город');
    }, []);

    const handleConfirmModal = useCallback(() => {
        setShowModal(false);
    }, []);

    const getCity = (coordinates: number[]) => {
        const xhr = new XMLHttpRequest();
        xhr.open(
            'GET',
            'https://us1.locationiq.com/v1/reverse.php?key=pk.732061efdbb226a69031dc07e6e562b3&lat=' +
                coordinates[0] +
                '&lon=' +
                coordinates[1] +
                '&format=json',
            true
        );
        xhr.send();
        xhr.onreadystatechange = processRequest;
        xhr.addEventListener('readystatechange', processRequest, false);

        function processRequest(e: any) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const response = JSON.parse(xhr.responseText);
                const city = response.address.city;

                setCurrentLocation(city);

                return;
            }
        }
    };

    return (
        <Wrapper>
            <span style={{ fontSize: '17px' }} className="icon-location"></span>
            <LocationText color={TextColor.BLUE}>{currentLocation}</LocationText>
            <AlertModal
                handleConfirmModal={handleConfirmModal}
                handleRejectModal={handleRejectModal}
                isOpen={showModal}
                text={`Ваше месторасположение ${currentLocation}?`}
            />
        </Wrapper>
    );
});
