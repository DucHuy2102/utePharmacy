import React, { useEffect } from "react";
import styled from "styled-components";
import SummaryInvoice from "./SummaryInvoice";
import TableInvoice from "./TableInvoice";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrder,
  orderSingleSelector,
} from "../../store/reducers/ordersSlice";
import { useSearchParams } from "react-router-dom";

const Wraper = styled.div`
  width: 100%;
  margin-top: 14px;
  overflow: auto;
  background-color: #f3f3f9;
  /* height: 100vh; */
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  flex-direction: column;
  padding: 32px;
  margin: 33px 16px 16px;
  border-radius: 5px;
  box-shadow: 0px 0px 6px #b2b2b2;
`;
const Content = styled.div`
  margin: 0 14px;
  /* background-color: red; */
  border-radius: 5px;
  box-shadow: 0px 0px 6px #b2b2b2;
  margin-bottom: 14px;
  justify-content: space-between;
`;
const MainContent = styled.div`
  margin: 10px 14px 60px;
  border-radius: 5px;
  box-shadow: 0px 0px 6px #b2b2b2;
  display: flex;
  /* font-family: "Montserrat"; */
  justify-content: space-between;
  /* width: 100%; */
  padding: 24px 32px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const Status = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 16px;
  line-height: 24px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: left;
  }
`;
const StatusHeader = styled.div``;
const Address = styled.div``;
const H1 = styled.h1`
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  text-align: ${(props) => props.textAlign || "left"};
  text-transform: uppercase;

  @media (max-width: 768px) {
    text-align: center;
  }
`;
const P = styled.p`
  color: #707275;
  font-size: 13px;
  font-weight: 700;
  line-height: 19.5px;
  margin: 4px 0px 0px;
  display: inline-block;
  text-transform: uppercase;
  text-align: ${(props) => props.textAlign || "left"};
  @media (max-width: 768px) {
    text-align: center;
  }
`;
const Process = styled.span`
  background-color: #e1effe;
  border-radius: 9999px;
  color: #3f83f8;
  display: inline-flex;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  padding: 0px 8px;
  text-transform: capitalize;
`;
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 24px;
  padding: 16px 0px 0px;
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: left;
  }
`;
const WraperInfo = styled.div``;
const HeadingInfo = styled.span`
  color: #4c4f52;
  font-size: 14px;
  font-weight: 700;
  line-height: 21px;
  text-transform: uppercase;
  display: block;
  text-align: ${(props) => props.textAlign || "left"};
  @media (max-width: 768px) {
    text-align: center;
  }
`;
const ContentInfo = styled.span`
  color: #707275;
  display: inline;
  font-size: 14px;
  display: block;
  line-height: 21px;
  text-align: ${(props) => props.textAlign || "left"};
  @media (max-width: 768px) {
    text-align: center;
  }
`;
const Invoice = () => {
  // param
  let [searchParams] = useSearchParams();

  // redux
  const order = useSelector(orderSingleSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder(searchParams.get("id")));
  }, [dispatch, searchParams]);
  return (
    <Wraper>
      <Header>
        <Status>
          <StatusHeader>
            <H1>INVOICE</H1>
            <P>STATUS: </P>
            <Process>{order.state}</Process>
          </StatusHeader>
          <Address>
            <H1 textAlign="right">Dashtar</H1>
            <P textAlign="right">
              Cecilia Chapman, 561-4535 Nulla LA,
              <br /> United States 96522
            </P>
          </Address>
        </Status>
        <Info>
          <WraperInfo>
            <HeadingInfo>Date</HeadingInfo>
            <ContentInfo>{order.date}</ContentInfo>
          </WraperInfo>
          <WraperInfo>
            <HeadingInfo>invoice no</HeadingInfo>
            <ContentInfo>#{order.order_id}</ContentInfo>
          </WraperInfo>
          <WraperInfo>
            <HeadingInfo textAlign="right">invoice to</HeadingInfo>
            <ContentInfo textAlign="right">
              {order.receiver}
              <br />
              VietNam
              <br />
              {order.address}
            </ContentInfo>
          </WraperInfo>
        </Info>
      </Header>
      <Content>
        <TableInvoice order={order} />
      </Content>
      <MainContent>
        <SummaryInvoice order={order} />
      </MainContent>
    </Wraper>
  );
};

export default Invoice;
