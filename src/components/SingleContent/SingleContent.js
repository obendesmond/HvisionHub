import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  makeStyles,
  Grid,
  Badge,
} from "@material-ui/core";
import { img_300, unavailable } from "../../config/Config";
import ContentModal from "../ContentModal/ContentModal";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    borderRadius: "10px",
    margin: "20px",
    "&:hover": {
      backgroundColor: "lightgrey",
      // color: 'white'
    },
  },
  poster: {
    height: "300px",
    objectFit: "cover",
    "&:hover": {
      transform: "scale(1.1,1.1)",
      transition: "1s ease-in-out",
      // transitionDuration: '1s',
    },
  },
  title: {
    textAlign: "center",
  },
  badge: {
    position: "absolute",
    margin: "20px 0px 0px 25px",
  },
});

function SingleContent({ id, poster, title, date, media_type, vote_average }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
    // console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    // take the key property of the first
    setVideo(data.results[0]?.key);
  };

  const handleOpen = () => {
    //   fetch clicked content data when it's open
    fetchData();
    fetchVideo();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card onClick={handleOpen} className={classes.root}>
        <CardActionArea>
          <Badge
            className={classes.badge}
            badgeContent={vote_average}
            color={vote_average > 6 ? "secondary" : "error"}
          />
          <CardMedia
            className={classes.poster}
            component="img"
            alt={title}
            image={poster ? `${img_300}${poster}` : unavailable}
            title={title}
          />
          <CardContent>
            <Grid container justifyContent="center" alignContent="center">
              <Typography
                className={classes.title}
                gutterBottom
                variant="h5"
                component="h2"
              >
                <b>{title}</b>
              </Typography>
            </Grid>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid item>
              <Button size="small" color="secondary">
                {media_type === "tv" ? "TV Series" : "Movie"}
              </Button>
            </Grid>
            <Grid item>
              <Button size="small" color="secondary">
                {date}
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      <ContentModal
        open={open}
        handleClose={handleClose}
        media_type={media_type}
        content={content}
        video={video}
        id={id}
      />
    </>
  );
}

export default SingleContent;
