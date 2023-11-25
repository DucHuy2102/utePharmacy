import React from "react";
import Table from "./TableExport";
import styled from "styled-components";
const TableWrap = styled.div`
  background-color: #f3f3f9;
  padding: 14px 0;
`;
const Product = () => {
  return (
    <TableWrap>
      <Table />
    </TableWrap>
  );
};

export default Product;
