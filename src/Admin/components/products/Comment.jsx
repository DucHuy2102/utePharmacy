// import React, { useEffect } from "react";
// import styled from "styled-components";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   commentsSelector,
//   getCommentById,
// } from "../../store/reducers/commentsSlice";

// const Comment = ({ id }) => {
//   // redux
//   const dispatch = useDispatch();
//   const comments = useSelector(commentsSelector);

//   useEffect(() => {
//     dispatch(getCommentById(id));
//   }, [dispatch]);
//   return (
//     <ContainerComment>
//       <Header>
//         <Heading>Comment</Heading>
//       </Header>
//       <Table>
//         <Tr>
//           <Th>Name</Th>
//           <Th>Content</Th>
//           <Th>Action</Th>
//           <Th>Action</Th>
//         </Tr>
//         {comments?.map((commentSingle) => {
//           return (
//             <Tr key={commentSingle.id}>
//               <Td>{commentSingle.username}</Td>
//               <Td>{commentSingle.comment}</Td>
//               <Td>Remove</Td>
//               <Td>Remove</Td>
//             </Tr>
//           );
//         })}
//       </Table>
//     </ContainerComment>
//   );
// };

// const ContainerComment = styled.div`
//   margin-bottom: 140px;
// `;
// const Header = styled.div``;
// const Heading = styled.h3``;
// const Table = styled.table`
//   border-collapse: collapse;
//   width: 100%;
//   table-layout: auto;
//   margin: 14px 0 28px;
// `;
// const Tr = styled.tr`
//   &:nth-child(even) {
//     background-color: #f2f2f2;
//   }
//   &:hover {
//     background-color: #ddd;
//   }
// `;
// const Td = styled.td`
//   border: 1px solid #ddd;
//   padding: 8px;
//   &:nth-child(1) {
//     width: 150px;
//   }
//   &:nth-child(3) {
//     color: red;
//   }
//   text-overflow: ellipsis;
// `;
// const Th = styled.th`
//   border: 1px solid #ddd;
//   padding: 8px;
//   padding-top: 12px;
//   padding-bottom: 12px;
//   text-align: left;
//   background-color: #04aa6d;
//   color: white;
//   &:nth-child(3) {
//     color: blue;
//   }
// `;

// export default Comment;

import * as React from "react";
import Table from "@mui/material/Table";
import { useSelector, useDispatch } from "react-redux";
import {
  commentsSelector,
  getCommentById,
  removeCommentById,
} from "../../store/reducers/commentsSlice";
import swal from "sweetalert";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Comments({ id }) {
  // redux
  const dispatch = useDispatch();
  const comments = useSelector(commentsSelector);

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
        dispatch(removeCommentById(id));
        // navigate(`../product/detail/?id=${updatedProduct.product_id}`);
      } else {
        swal("Your imaginary file is safe!");
      }
    });
    // dispatch(updateProduct(updatedProduct));
  };
  React.useEffect(() => {
    dispatch(getCommentById(id));
  }, [dispatch, id]);
  if (comments.message) return <h1>No comment For product</h1>;
  return (
    <TableContainer
      component={Paper}
      style={{ marginBottom: "140px", padding: "0 14px" }}
    >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Comment</TableCell>
            <TableCell align="center">Rate</TableCell>
            <TableCell align="center">Time</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comments.map((comment) => (
            <TableRow
              key={comment.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{comment.username}</TableCell>
              <TableCell
                component="th"
                scope="comment"
                align="center"
                color="blue"
              >
                {comment.comment}
              </TableCell>
              <TableCell align="center">{comment.rate}</TableCell>
              <TableCell align="center">{comment.datetime}</TableCell>
              <TableCell
                align="center"
                style={{ cursor: "pointer" }}
                onClick={() => handleDelete(parseInt(comment.id))}
              >
                <DeleteIcon color="danger" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
