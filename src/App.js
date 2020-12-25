import React from 'react';
import './App.css';
import Home from './Components/home';
import Add from './Components/add';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

function App() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              React TODO Application
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route exact path='/add'>
            <Add/>
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
