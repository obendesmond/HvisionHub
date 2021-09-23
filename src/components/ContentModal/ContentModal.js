import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Slide from "@material-ui/core/Slide";
import { Button, Grid, Hidden, Typography, Container } from "@material-ui/core";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/Config";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Carousel from "../Carousel/Carousel";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    // maxWidth: 600,
    // maxHeight: 600,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "15px",
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(4, 4, 4),
    padding: "40px 30px 40px 30px",
  },
  posterContainer: {
    maxHeight: "500px",
  },
  poster: {
    height: "100%",
    objectFit: "cover",
  },
  backdrop: {
    width: "300px",
    objectFit: "cover",
    borderRadius: "15px",
  },
  description: {
    textAlign: "justify",
    padding: "15px",
    maxHeight: "10%",
    overflowY: "scroll",
    width: "400px",
    borderRadius: "20px",
    scrollbarWidth: "thin",
  },
  description2: {
    textAlign: "justify",
    overflowY: "scroll",
    maxWidth: "400px",
    marginBottom: "30px",
    maxHeight: "100px",
  },
  carouselContainer: {
    width: "400px",
  },
}));

export default function ContentModal({
  open,
  content,
  video,
  handleClose,
  media_type,
  id,
}) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide in={open} direction="up">
          <div className={classes.paper}>
            {content && (
              <>
                {/* For small screens */}
                <Hidden mdUp>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    direction="column"
                    spacing={1}
                  >
                    <Grid sm={12} item>
                      <img
                        className={classes.backdrop}
                        src={
                          content.backdrop_path
                            ? `${img_500}/${content.backdrop_path}`
                            : unavailableLandscape
                        }
                        alt={content.backdrop_path}
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <Typography variant="h5">
                        <b>
                          {content.name || content.title} (
                          {(
                            content.first_air_date ||
                            content.release_date ||
                            "----"
                          ).substring(0, 4)}
                          )
                        </b>
                      </Typography>
                    </Grid>
                    <Grid sm={12} item>
                      <Typography>{content.tagline}</Typography>
                    </Grid>
                    <Grid sm={12} className={classes.description} container>
                      <Typography>{content.overview}</Typography>
                    </Grid>
                    <Grid item md={12} className={classes.carouselContainer}>
                      {/* carousel */}
                      <Container>
                        <Carousel media_type={media_type} id={id} />
                      </Container>
                    </Grid>
                    <Grid style={{ width: "100%" }} item sm={12}>
                      <Button
                        style={{ width: "100%" }}
                        startIcon={<YouTubeIcon />}
                        color="secondary"
                        variant="contained"
                        target="__blank"
                        href={`https://www.youtube.com/watch?v=${video}`}
                      >
                        Watch Trailer
                      </Button>
                    </Grid>
                  </Grid>
                </Hidden>
                {/* for large screens */}
                <Hidden smDown>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Grid md={4} item className={classes.posterContainer}>
                      <img
                        className={classes.poster}
                        src={
                          content.poster_path
                            ? `${img_500}/${content.poster_path}`
                            : unavailable
                        }
                        alt={content.poster_path}
                      />
                    </Grid>
                    <Grid md={6} item>
                      <Grid
                        container
                        direction="column"
                        justifyContent="flex-end"
                      >
                        <Grid item md={12}>
                          <Typography
                            variant="h5"
                            style={{
                              marginBottom: "20px",
                              textAlign: "center",
                            }}
                          >
                            <b>
                              {content.name || content.title} (
                              {(
                                content.first_air_date ||
                                content.release_date ||
                                "----"
                              ).substring(0, 4)}
                              )
                            </b>
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          sm={12}
                          style={{ textAlign: "center", marginBottom: "15px" }}
                        >
                          <Typography>{content.tagline}</Typography>
                        </Grid>
                        <Grid item md={12} className={classes.description2}>
                          <Typography>{content.overview}</Typography>
                        </Grid>
                        <Grid
                          item
                          md={12}
                          className={classes.carouselContainer}
                        >
                          {/* carousel */}
                          <Container>
                            <Carousel media_type={media_type} id={id} />
                          </Container>
                        </Grid>
                        <Grid item style={{ width: "100%" }} md={12}>
                          <Button
                            style={{ width: "100%" }}
                            startIcon={<YouTubeIcon />}
                            color="secondary"
                            variant="contained"
                            target="__blank"
                            href={`https://www.youtube.com/watch?v=${video}`}
                          >
                            Watch Trailer
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Hidden>
              </>
            )}
          </div>
        </Slide>
      </Modal>
    </div>
  );
}
