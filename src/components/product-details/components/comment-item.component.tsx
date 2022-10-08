import React, { useCallback } from 'react';
import styled from 'styled-components';

import { BodyText, TitleText, TextColor, TextSize, TextWeight } from '../../../ui/text';

const CommentItemWrapper = styled.div`
    box-sizing: border-box;
    width: 80%;
    margin: 50px 0;
`;

const UserAvatarImage = styled.img`
    max-width: 4%;
`;

const UseInfo = styled.div`
    display: flex;
    box-sizing: border-box;
`;

const UserName = styled(TitleText).attrs({ weight: TextWeight.DEFAULT, color: TextColor.DARK, size: TextSize.MEDIUM })`
    margin: 0 10px 0;
`;

const CommentTime = styled(BodyText).attrs({ color: TextColor.LIGHT, size: TextSize.MEDIUM })`
    margin: 0 10px 0;
`;

const CommentText = styled(BodyText).attrs({ color: TextColor.DARK, size: TextSize.MEDIUM })`
    margin: 0 10px 0;
`;

interface CommentItemProps {
    comment: any;
}

export const CommentItem: React.FC<CommentItemProps> = React.memo(function CommentItem({ comment }: CommentItemProps) {
    const parseDate = useCallback(() => {
        return 'comment.date';
    }, [comment]);

    return (
        <CommentItemWrapper>
            <UseInfo>
                {comment.userAvatar && <UserAvatarImage src={comment.userAvatar} />}
                <UserName>{comment.userName}</UserName>
                <CommentTime>{parseDate()}</CommentTime>
            </UseInfo>
            {/* <CommentText>{comment.comment}</CommentText> */}
        </CommentItemWrapper>
    );
});
