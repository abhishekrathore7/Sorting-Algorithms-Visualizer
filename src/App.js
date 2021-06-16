import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import MainFile from './algorithms/MainFile'
import {AppBar,Toolbar,IconButton,Typography} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

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
})); 

function App() {
  const classes = useStyles();
  return (
    <div className="App">
     <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          Algorithms Visualizer
        </Typography>
      </Toolbar>
    </AppBar>
<MainFile />
    </div>
  );
}

export default App;
