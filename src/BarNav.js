import React, { useState, useEffect, useRef } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import logo from './BYUI.png';
import Sun from './Sun';
import Mountain from './Mountain.png'
import Grid from "@material-ui/core/Grid";

const EasyRentURL = 'https://easyrent-api-dev.cit362.com/reservations'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(107),
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 19,
    marginLeft: 'auto',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  subtitle: {
    color: '#EBEBEB',
    fontSize: 19,
    marginTop: 0,
    marginBottom: -10,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
 
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
      
    },
    position: 'absolute',
    height: 35,
    width: '17%',
    right: 15,
    marginTop: 24,
    
  },
  searchIcon: {
    padding: theme.spacing(0.6, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'absolute m',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 9),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      '&:focus': {
        width: '100%',
      },
    },
  },
  logo: {
    width: 135,
    height: 43.54,
    marginTop: 40
  }
}));
 

export default function SearchAppBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [Allitems, setAllItems] = useState([]);
  const [error, setError] = useState(null);

    useEffect (() => {
      fetch(EasyRentURL)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setAllItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    })
  
  return (
    <div className={classes.root}>
      
      <AppBar style={{ margin: 0 , backgroundColor: "#006EB6"}} position="static,">
    
        <Toolbar>
        <Grid justify={"space-between"} container>
          <Grid xs={1} item>
            <img src={logo} className="App-logo" alt="logo" />
          </Grid>
          
          <div>
            
          <title className={classes.title} variant="h6" Wrap>
            Outdoor Resource Center
          </title>
          <subtitle className={classes.subtitle} variasnt="h6" Wrap>
            BYU-Idaho
          </subtitle>

          </div>
       
          <Grid xs={6} item>
            <Grid container justify={"center"}>
          <div className="sun"><Sun/></div>   
          {<img src={Mountain} className="mountain"/> }
            </Grid>
            </Grid>
            <Grid item xs={3} />
  
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase 
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              
              
            />
          
          </div>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
