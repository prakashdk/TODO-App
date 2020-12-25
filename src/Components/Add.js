import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormHelperText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Add() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [helper, setHelper] = useState("");
  const [disable, setDisable] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setId(sessionStorage.getItem("edit_id"));
    setName(sessionStorage.getItem("edit_name"));
    setEmail(sessionStorage.getItem("edit_email"));
    sessionStorage.setItem("edit_id", "");
    sessionStorage.setItem("edit_name", "");
    sessionStorage.setItem("edit_email", "");
    setDisable(isEmpty(id) ? false : true);
  }, []);

  const setUser = () => {
    if (isEmpty(id) || isEmpty(name) || isEmpty(email)) {
      setHelper("All Valid details required");
    } else {
      fetch(
        "http://localhost:6065/add?id=" +
          id +
          "&name=" +
          name +
          "&email=" +
          email
      )
        .then((res) => res.text())
        .then((r) => alert(r))
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const isEmpty = (a) => {
    return a === "" || a === null || a === undefined || a === "0" || a === 0;
  };

  return (
    <>
      <div className="header">
        <h1>{isEmpty(id) ? "Add " : "Edit "}User</h1>
      </div>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="id"
              label="ID"
              id="id"
              type="number"
              autoComplete="id"
              value={id}
              disabled={disable}
              onChange={(event) => {
                setId(event.target.value);
              }}
              onFocus={() => {
                setHelper("");
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              id="name"
              autoComplete="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              onFocus={() => {
                setHelper("");
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Emai ID"
              name="email"
              autoComplete="email"
              onFocus={() => {
                setHelper("");
              }}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <FormHelperText error>{helper}</FormHelperText>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={setUser}
            >
              {isEmpty(id) ? "Save" : "Update"}
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}
