import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography } from "@material-ui/core";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Genres from "../../components/Genres/Genres";
import useGenres from "../../hooks/useGenres";

function Series() {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreForURL = useGenres(selectedGenres);

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
    );

    // console.log(data)
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    // scroll to the top
    window.scroll(0, 0);
    fetchSeries();
  }, [page, genreForURL]);

  return (
    <Grid container direction="column" justifyContent="center">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography
            style={{ textAlign: "center" }}
            gutterBottom
            variant="h3"
            component="h3"
          >
            <b>TV SERIES</b>
          </Typography>
        </Grid>
        <Grid item>
          <Genres
            type="movie"
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            genres={genres}
            setGenres={setGenres}
            setPage={setPage}
          />
        </Grid>
      </Grid>
      <Grid container direction="row" justifyContent="center">
        {content &&
          content.map((c) => (
            <Grid item xs={12} key={c.id} sm={6} md={4}>
              <SingleContent
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type="tv"
                vote_average={c.vote_average}
              />
            </Grid>
          ))}
      </Grid>
      {numOfPages ? (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      ) : (
        <Grid container justifyContent="center">
          <Typography variant="h6">Loading...</Typography>
        </Grid>
      )}
    </Grid>
  );
}

export default Series;

//                 {/* {
//                     content && content.map((c) => (
//                         <Grid item xs={12} sm={6} md={4}>
//                             <SingleContent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type='tv' vote_average={c.vote_average} />
//                         </Grid>
//                     ))
//                 } */}
//
