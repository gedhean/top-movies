import React from 'react'
import PropTypes from 'prop-types'
import GridList from '@material-ui/core/GridList'
import { withStyles } from '@material-ui/core/styles'
import InfiniteScroller from 'react-infinite-scroller'

import CircularLoading from '../components/CircularLoading.js'
import MovieListItem from './MovieListItem'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing.unit * 3
  },
  gridList: {
    maxWidth: 500,
    height: 'auto',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
})

function AdvancedGridList(props) {
  const { classes, movies, loadMore, hasMore, extraInfo } = props

  return (
    <div className={classes.root}>
      {movies.length ? (
        <InfiniteScroller
          pageStart={1}
          loadMore={loadMore}
          hasMore={hasMore}
          // useWindow={false}
        >
          <GridList cellHeight={200} spacing={2} className={classes.gridList}>
            {movies.map(movie => (
              <MovieListItem key={movie.id} movie={movie} extraInfo={extraInfo}/>
            ))}
          </GridList>
        </InfiniteScroller>
      ) : (
        <CircularLoading size={50} color="secondary" />
      )}
    </div>
  )
}

AdvancedGridList.propTypes = {
  classes: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired
}

export default withStyles(styles)(AdvancedGridList)

/**
 * The example data is structured as follows:
  
   const movies = [
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
