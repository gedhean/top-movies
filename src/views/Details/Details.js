import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import apiFetch from '../../api/fetch.js'
import config from '../../config'
import ResourceNotFound from '../../components/ResourceNotFound.js'

const styles = {
  root: {
    maxWidth: '720px',
    margin: '0px auto',
    paddingTop: '16px'
  }
}

class Details extends Component {
  state = { error: '' }

  componentDidMount() {
    const { params } = this.props.match
    // Fetch movie details based on movie id
    // May be it fail because the API has somes bugs 
    apiFetch(`movie/${params.id}`)
      .then(data => {
        this.setState({ movie: data })
      })
      .catch(err => {
        this.setState({ error: 'Failed to load resource. Sorry.' })
        console.log('Details erro:', err)
      })
  }

  render() {
    const { classes } = this.props
    const { movie } = this.state

    // API failed to found resource
    if (this.state.error) {
      return (
        <ResourceNotFound info={this.state.error}/>
      )
    }

    return movie ? (
      <div className={classes.root}>
        <Card>
          <CardMedia
            component="img"
            image={`${config.api.backdrop_base_url(1)}/${movie.backdrop_path}`}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {movie.title || movie.original_title || movie.original_name || movie.name}
            </Typography>
            <Typography component="p" variant="body1">
              {movie.overview}
            </Typography>
          </CardContent>
        </Card>
      </div>
    ) : (
      <LinearProgress color="secondary" />
    )
  }
}

export default withStyles(styles)(Details)
