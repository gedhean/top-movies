import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import { Link } from 'react-router-dom'
import config from '../config'
import { Tooltip } from '@material-ui/core'

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 600,
    padding: theme.spacing.unit * 2
  },
  image: {
    width: 150,
    height: 230
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  }
})

function MovieListItem(props) {
  const { classes, movie } = props
  return (
    <Paper className={classes.root}>
      <Grid container spacing={16}>
        <Grid item>
          <ButtonBase
            to={`/details/${movie.id}`}
            className={classes.image}
            component={Link}
          >
            <img
              className={classes.img}
              alt="complex"
              src={`${config.api.post_base_url(1)}/${movie.poster_path}`}
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={16}>
            <Grid item xs>
              <Typography gutterBottom variant="headline" component="h2">
                {movie.title || movie.original_title || movie.originnal_name}
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                {movie.overview}
              </Typography>
              <Typography color="textSecondary">
                Vote agerage: {movie.vote_average}
              </Typography>
              <Typography color="textSecondary">
                Release date: {movie.release_date}
              </Typography>
            </Grid>
            {/* <Grid item>
              <Typography style={{ cursor: 'pointer' }}>Remove</Typography>
            </Grid> */}
          </Grid>
          {/* <Grid item>
            <Typography variant="caption">
              {movie.vote_average}{" "}
            </Typography>
          </Grid> */}
          <Grid item>
            <IconButton>
              <Tooltip title="Favorite" placement="top-start">
                <StarBorderIcon
                  style={{ fontSize: 16 }}
                />
              </Tooltip>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

MovieListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired
}

export default withStyles(styles)(MovieListItem)

/**
 * Movie schema
{
    "adult": false,
    "backdrop_path": "/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg",
    "genre_ids": [28,12,14,878],
    "id": 299536,
    "original_language": "en",
    "original_title": "Avengers: Infinity War",
    "overview": "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
    "poster_path": "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    "release_date": "2018-04-25",
    "title": "Avengers: Infinity War",
    "video": false,
    "vote_average": 8.3,
    "vote_count": 6937,
    "popularity": 358.799
}
 */
