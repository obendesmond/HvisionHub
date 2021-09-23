import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import TvIcon from '@material-ui/icons/Tv';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    bottom:'0px',
    background: theme.palette.secondary.main,
    position: 'fixed',
    zIndex: '100',
  },
  tabs: {
      color:'white',
  },
}));

export default function BottomNav() {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if(value === 0) history.push('/');
    else if(value === 1) history.push('/movies');
    else if(value === 2) history.push('/series');
    else if(value === 3) history.push('/search');
    else history.push('/'); //else go to trending page
  }, [value, history])

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction className={classes.tabs} label="Trending" icon={<WhatshotIcon />} />
      <BottomNavigationAction className={classes.tabs} label="Movies" icon={<MovieFilterIcon />} />
      <BottomNavigationAction className={classes.tabs} label="Tv Series" icon={<TvIcon />} />
      <BottomNavigationAction className={classes.tabs} label="Search" icon={<SearchIcon />} />
    </BottomNavigation>
  );
}
