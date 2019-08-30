import React from 'react'
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Dashboard from '../dashboard';
import { MenuList, MenuItem } from '@material-ui/core';



const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      marginLeft: drawerWidth,
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    title: {
        flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));

export function NavDrawer(props) {
  const { container, location: {pathname} } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const home_team = 'AUSTRALIA'
  const away_team = 'ENGLAND'
  const Series_name = 'ICC CRICKET WORLD CUP 2019'
  const name = 'MS Dhoni'
  const country = 'India'

  const upcomingmatch = "/dream11/core/login/loggedIN/"
  const leaderboard = "/dream11/core/login/loggedIN/leaderboard/"
  const fantasystats = "/dream11/core/login/loggedIN/fantasystats/"
  const contests = "/dream11/core/login/loggedIN/contests/"
  const createTeam = "/dream11/core/login/loggedIN/players/"
  const myteam = "/dream11/core/login/loggedIN/MyTeam/"
  const profile = "/dream11/core/login/loggedIN/profile/"
  const myleague = "/dream11/core/login/loggedIN/MyLeagues/"

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <MenuList>
        <MenuItem 
          component={RouterLink} 
          to={upcomingmatch} 
          selected={(upcomingmatch == pathname) || pathname.includes(createTeam) || pathname.includes(myteam) || pathname.includes(profile)}
        >
            Upcoming Matches
        </MenuItem>
        <MenuItem 
          component={RouterLink} 
          to={leaderboard} 
          selected={leaderboard === pathname}
        >
          Leaderboard
        </MenuItem>
        <MenuItem 
          component={RouterLink} 
          to={contests} 
          selected={(contests === pathname) || pathname.includes(myleague)}
        >
          Contests
        </MenuItem>
        <MenuItem 
          component={RouterLink} 
          to={fantasystats} 
          selected={fantasystats === pathname}
        >
          Fantasy Stats
        </MenuItem>
      </MenuList>
      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
      
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Dream 11
          </Typography>
          <Button color="inherit">
              My Account
          </Button>
          <Button color="inherit">Sign Out</Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
            {props.children}
      </main>
    </div>
  );
}

export default withRouter(NavDrawer)

NavDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};
  


