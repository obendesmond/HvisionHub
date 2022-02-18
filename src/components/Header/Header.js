import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Divider,
  Grid,
} from "@material-ui/core";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
const desmondInc = "/desmondInc.png";

const useStyles = makeStyles((theme) => ({
  logo: {
    fontSize: "45px",
  },
}));
function Header() {
  const classes = useStyles();
  return (
    <AppBar onClick={() => window.scroll(0, 0)} color="secondary">
      <Toolbar style={{ cursor: "pointer" }}>
        <Grid
          direction="row"
          container
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <VideoLibraryIcon className={classes.logo} />
          </Grid>
          <Grid item>
            <Typography variant="h4">
              {" "}
              <b>H-vision Hub</b>{" "}
            </Typography>
          </Grid>
          <Grid item>
            <Divider
              orientation="vertical"
              style={{
                margin: "0 10px 0 10px",
                color: "white",
                border: "2px solid white",
                height: "40px",
              }}
            />
          </Grid>
          <Grid item>
            <img style={{ height: "90px" }} src={desmondInc} alt={desmondInc} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
