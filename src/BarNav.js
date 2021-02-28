import React, { useState, useEffect, useRef } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import logo from './BYUI.png';

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
    marginTop: -10,
    marginLeft: 15,
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
    marginLeft: -175,
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
}));
const onSubmit = e => {
  e.preventDefault();
  alert("gotta submit");
};

export default function SearchAppBar() {
  const classes = useStyles()
  
  const [query, setQuery] = useState('')
  const [jokes, setJokes] = useState([])

  const focusSearch = useRef(null)

  // useEffect(() => {focusSearch.current.focus()}, [])
  
 
  const getJokes = async (query) => {
    const results = await fetch(`https://easyrent-api-dev.cit362.com/reservations?term=${query}`, {
      headers: {'accept': 'application/json'}
    })
    const jokesData = await results.json()
    return jokesData.results
  }
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  useEffect(() => {
    let currentQuery = true
    const controller = new AbortController()

    const loadJokes = async () => {
      if (!query) return setJokes([])
      await sleep(350)
      if (currentQuery) {
        const jokes = await getJokes(query, controller)
        setJokes(jokes)
      }
    }
    loadJokes()
      
    return () => {
      currentQuery = false
      controller.abort()
    }

  }, [query])

  let jokesComponents = jokes.map((item, index) => {
    return (
      <li className="Reservations" key={item.Id} >
                  

                  <div className="Customer" >
                    <p>Customer:&nbsp;</p>
                    
                  </div>

                  <div className="CustomerName">
                    {item.customerName} 
                  </div>
        </li>
    )
  })

  return (
    <div className={classes.root}>
      <AppBar style={{ margin: 0 , backgroundColor: "#006EB6"}} position="static,">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
          <img src={logo} className="App-logo" alt="logo" />
          <div>
          <title className={classes.title} variant="h6" Wrap>
            Outdoor Resource Center
          </title>
          <subtitle className={classes.subtitle} variasnt="h6" Wrap>
            BYU-Idaho
          </subtitle>
          </div>
          </IconButton>
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
              onChange={onSubmit}
              
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
