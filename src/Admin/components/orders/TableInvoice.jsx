import React from "react";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
  background-color: white;
  overflow: hidden;
  font-family: "Poppins", sans-serif;
`;
const Thead = styled.thead`
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
`;
const TrHead = styled.tr``;
const TdHead = styled.td`
  font-family: "Poppins", sans-serif;
  color: #707275;
  background-color: #f4f5f7;
  display: table-cell;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.3px;
  line-height: 19.5px;
  padding: 12px 16px;
  text-align: left;
  text-transform: uppercase;
  text-align: ${(props) => props.textAlign || "left"};
`;
const Tbody = styled.tbody``;
const Tr = styled.tr`
  border: 1px solid #ccc;
`;
const Td = styled.td`
  color: #707275;
  color: ${(props) => props.color || "#707275"};
  display: table-cell;
  font-size: 14px;
  line-height: 21px;
  padding: 12px 24px;
  text-align: ${(props) => props.textAlign || "left"};
  font-weight: ${(props) => (props.textAlign ? 700 : 400)};
`;

const TableInvoice = ({ order }) => {
  // const order = useSelector(orderSingleSelector);
  if (!order.item) return <h1>LOADING</h1>;
  return (
    <>
      <Table>
        <Thead>
          <TrHead>
            <TdHead textAlign="center">#</TdHead>
            <TdHead>PRODUCT NAME</TdHead>
            <TdHead textAlign="center">QUANTITY</TdHead>
            <TdHead textAlign="center">ITEM PRICE</TdHead>
            <TdHead textAlign="center">AMOUNT</TdHead>
          </TrHead>
        </Thead>
        <Tbody>
          {order.item.map((oneProduct, index) => {
            return (
              <Tr key={oneProduct.product_id}>
                <Td textAlign="center">{index + 1}</Td>
                <Td>{oneProduct.name}</Td>
                <Td textAlign="center">{oneProduct.amount}</Td>
                <Td textAlign="center">${oneProduct.price}</Td>
                <Td textAlign="center" color="red">
                  ${oneProduct.amount * oneProduct.price}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

export default TableInvoice;
