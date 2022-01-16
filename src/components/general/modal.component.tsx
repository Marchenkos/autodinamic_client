import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

export const Modal: React.FC = React.memo(function Modal(props) {
    const element = document.createElement('div');

    useEffect(() => {
        modalRoot!.appendChild(element);

        return () => {
            modalRoot!.removeChild(element);
        };
    }, []);

    return createPortal(props.children, element);
});
