import React from 'react';
import styled from 'styled-components';
const Wrapper = styled.div``;
const SpanHeading = styled.span`
    color: #4c4f52;
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
    margin: 0px 0px 4px;
    text-transform: uppercase;
    display: block;
`;
const SpanContent = styled.span`
    color: ${(props) => props.color || '#707275'};
    font-size: ${(props) => (props.color ? '20px' : '14px')};
    font-weight: ${(props) => (props.color ? 700 : 600)};
    line-height: 21px;
`;
const SummaryInvoice = ({ order }) => {
    if (!order.item) return <h1>Loading</h1>;
    return (
        <>
            <Wrapper>
                <SpanHeading>Phương thức thanh toán</SpanHeading>
                <SpanContent>Thẻ ngân hàng</SpanContent>
            </Wrapper>
            <Wrapper>
                <SpanHeading>Phí vận chuyển</SpanHeading>
                <SpanContent>{order.total_ship}.000đ</SpanContent>
            </Wrapper>
            <Wrapper>
                <SpanHeading>Giảm giá</SpanHeading>
                <SpanContent>0đ</SpanContent>
            </Wrapper>
            <Wrapper>
                <SpanHeading>Tổng chi phí</SpanHeading>
                <SpanContent color='red'>{order.total_ship + order.total}đ</SpanContent>
            </Wrapper>
        </>
    );
};

export default SummaryInvoice;
