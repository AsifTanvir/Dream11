import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const home_team = 'AUSTRALIA'
  const away_team = 'ENGLAND'
  const Series_name = 'ICC CRICKET WORLD CUP 2019'
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Dream11
          </Typography>
          <Button color="inherit" component={RouterLink} to={`/dream11/core/login/loggedIN/players/${home_team}/${away_team}/${Series_name}`}>
              My Account
          </Button>
          <Button color="inherit">Sign Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
