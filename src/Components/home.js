import React, { useState, useEffect } from "react";
import {
  IconButton,
  Button,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {useHistory} from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  table: {
    minWidth: 650,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const history=useHistory();

  useEffect(() => {
    fetch("http://localhost:6064/all")
      .then((res) => res.json())
      .then((r) => setUsers(r))
      .catch((e)=>{console.log(e)});
  }, []);

  const addUser = () => {
    sessionStorage.setItem("edit_id","");
    sessionStorage.setItem("edit_name","");
    sessionStorage.setItem("edit_email","");
      history.push('/add');
    //alert("Add");
  };
  const editUser = (row) => {
      sessionStorage.setItem("edit_id",row.id);
      sessionStorage.setItem("edit_name",row.name);
      sessionStorage.setItem("edit_email",row.email);
      history.push('/add');
      //alert("Edit :"+id);
  };
  const deleteUser = (id) => {
    alert("Delete :"+id);
  };
  return (
    <>
      
      <div className="header">
        <h1>User Details</h1>
      </div>
      <div className="button">
        <Button variant="outlined" color="primary" onClick={addUser}>
          <b>Add User</b>
        </Button>
      </div>
      {users.length>0?(
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>User ID</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email ID</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={()=>{editUser(row)}}
                  >
                    <EditIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={()=>{deleteUser(row.id)}}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      ):(
          <h1>
              No User Found
          </h1>
      )}
    </>
  );
}
