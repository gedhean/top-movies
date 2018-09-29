import React from 'react'
import PropTypes from 'prop-types'
import GridList from '@material-ui/core/GridList'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import GridListTile from '@material-ui/core/GridListTile'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import { Link } from 'react-router-dom'
import config from '../config'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 3
  },
  gridList: {
    width: 780,
    height: 'auto',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  icon: {
    color: 'white'
  }
})

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
  
   const tileData = [
     {
     "adult": false,
     "backdrop_path": "/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg",
      "genre_ids": [
        28,
        12,
        14,
        878
      ],
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
    },
     {
       [etc...]
     },
   ];
 */
function AdvancedGridList(props) {
  const { classes, movies } = props

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} spacing={2} className={classes.gridList}>
        {movies ? (
          movies.map(movie => (
            <GridListTile key={movie.id} cols={1} rows={1}>
              <img
                src={`${config.api.base_url}/${config.api.backdrop_size}/${
                  movie.backdrop_path
                }`}
                alt={movie.name || movie.original_name || movie.original_title}
              />
              <Link to="/details">
                <GridListTileBar
                  title={
                    movie.name || movie.original_name || movie.original_title
                  }
                  titlePosition="bottom"
                  actionIcon={
                    <IconButton className={classes.icon}>
                      <StarBorderIcon />
                    </IconButton>
                  }
                  actionPosition="right"
                  className={classes.titleBar}
                />
              </Link>
            </GridListTile>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </GridList>
    </div>
  )
}

AdvancedGridList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AdvancedGridList)
