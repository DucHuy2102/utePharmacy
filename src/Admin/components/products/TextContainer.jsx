import React from "react";
import styled from "styled-components";
const TextContainer2 = styled.div`
  display: flex;
  background-color: #e3e5ec;
  border: 1px solid #ccc;
  padding: 10px;
  align-items: center;
`;
const Label = styled.label`
  min-width: 100px;
`;
const Span = styled.span`
  color: #8d95b4;
`;
const TextContainer = ({ label, text }) => {
  return (
    <TextContainer2>
      <Label>{label}</Label>
      <Span>{text}</Span>
    </TextContainer2>
  );
};

export default TextContainer;
