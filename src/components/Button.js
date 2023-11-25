import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
    return (
        <Btn className={props.type} onClick={props.onClick}>
            {props.text}
        </Btn>
    );
};

const Btn = styled.button`
    width: 100%;
    padding: 5px;
    background: #0156ff;
    border-radius: 999px;
    color: #ffffff;
    cursor: pointer;
    font-family: Inter, Helvetica, 'Apple Color Emoji', 'Segoe UI Emoji', NotoColorEmoji, 'Noto Color Emoji',
        'Segoe UI Symbol', 'Android Emoji', EmojiSymbols, -apple-system, system-ui, 'Segoe UI', Roboto, 'Helvetica Neue',
        'Noto Sans', sans-serif;
    font-size: 16px;
    line-height: 24px;
    opacity: 1;
    outline: 0 solid transparent;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    word-break: break-word;
    border: 0;
    &.sm {
        width: 160px;
        padding: 2px;
    }
    &.primary {
        background: transparent;
        border: 3px solid #0156ff;
        color: #0156ff;
    }
    &.transparent {
        background: transparent;
        border: 3px solid gray;
        color: gray;
    }
    :hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
`;
export default Button;
