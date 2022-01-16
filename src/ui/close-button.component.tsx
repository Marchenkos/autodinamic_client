import React from 'react';
import './close-button.scss';

export interface CloseButtonProps {
    handleOnClick: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = React.memo(function CloseButton({
    handleOnClick,
}: CloseButtonProps) {
    return (
        <div className="close-container" onClick={handleOnClick}>
            <div className="leftright"></div>
            <div className="rightleft"></div>
        </div>
    );
});
