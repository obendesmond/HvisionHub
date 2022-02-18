import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  makeStyles,
  Paper,
  InputBase,
  IconButton,
  Tabs,
  Tab,
  Divider,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Genres from "../../components/Genres/Genres";
import useGenres from "../../hooks/useGenres";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px",
    display: "flex",
    alignItems: "center",
    width: "auto",
    marginBottom: 20,
  },
  input: {
    marginLeft: theme.spacing(4),
    flex: 1,
    width: 500,
  },
  iconBtn: {
    padding: 10,
    marginRight: 10,
  },
}));

export default function Search() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const [page, setPage] = useState(1);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${
          value ? "tv" : "movie"
        }?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    //   scroll to the top
    window.scroll(0, 0);
    fetchSearch();
  }, [value, page, searchText]);

  return (
    <Grid container direction="column" justifyContent="center">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item style={{ width: "50%" }}>
          <Typography
            style={{ textAlign: "center" }}
            gutterBottom
            variant="h3"
            component="h2"
          >
            <b>SEARCH</b>
          </Typography>
          <Paper component="form" className={classes.root}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid style={{ flex: 1 }}>
                <InputBase
                  onChange={handleSearchChange}
                  className={classes.input}
                  placeholder="Search Movies or Series"
                  inputProps={{ "aria-label": "search movies or series" }}
                />

                <IconButton
                  onClick={fetchSearch}
                  color="secondary"
                  className={classes.iconBtn}
                >
                  <SearchIcon />
                </IconButton>
              </Grid>
              <Divider style={{ width: "100%" }} />
              <Grid>
                <Tabs
                  value={value}
                  onChange={handleTabChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  variant="fullWidth"
                  arial-label="search-tabs"
                >
                  <Tab label="Search Movies" />
                  <Tab label="Search Series" />
                </Tabs>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        {/* <TabPanel value={value} index={0}>
                Item One here: 
                <b>{searchText}</b>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two: 
                <b>{searchText}</b>
            </TabPanel> */}
        <Grid container direction="row" justifyContent="center">
          {content &&
            content.map((c) => (
              <Grid item xs={12} sm={6} md={4}>
                <SingleContent
                  key={c.id}
                  id={c.id}
                  poster={c.poster_path}
                  title={c.title || c.name}
                  date={c.first_air_date || c.release_date}
                  media_type={value ? "tv" : "movie"}
                  vote_average={c.vote_average}
                />
              </Grid>
            ))}
          {searchText &&
            !content &&
            (value ? (
              <Typography variant="h4">No Series Found</Typography>
            ) : (
              <Typography variant="h4">No Movies Found</Typography>
            ))}
        </Grid>
        {numOfPages > 1 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        )}
      </Grid>
    </Grid>
  );
}
