import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography } from "@material-ui/core";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

function Trending() {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );

    // console.log(data)
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    // scroll to the top
    window.scroll(0, 0);
    fetchTrending();
  }, [page]);

  return (
    <Grid container direction="column" justifyContent="center">
      <Grid container justifyContent="center" alignItems="center">
        <Typography
          style={{ textAlign: "center" }}
          gutterBottom
          variant="h3"
          component="h3"
        >
          <b>TRENDING TODAY</b>
        </Typography>
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
                media_type={c.media_type}
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

export default Trending;
