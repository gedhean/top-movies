import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import withStyles from '@material-ui/core/styles/withStyles'
import LinearProgress from '@material-ui/core/LinearProgress'
import MoneyIcon from '@material-ui/icons/AttachMoney'
import TimeIcon from '@material-ui/icons/AccessTime'
import config from '../../config'
import apiFetch from '../../api/fetch.js'
import ResourceNotFound from '../../components/ResourceNotFound.js'
import MoviePopularity from '../../components/MoviePopularity'

const styles = {
  root: {
    maxWidth: '720px',
    margin: '0px auto',
    paddingTop: '16px'
  },
  item: { display: 'inline-flex', alignItems: 'center', marginRight: '12px' },
  icon: { fontSize: '18px' }
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
        console.log(data)
      })
      .catch(err => {
        this.setState({ error: 'Failed to load resource. Sorry.' })
        console.log('Details erro:', err)
      })
  }

  formateNum = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: "code" }).format

  render() {
    const { classes } = this.props
    const { movie } = this.state

    // API failed to found resource
    if (this.state.error) {
      return <ResourceNotFound info={this.state.error} />
    }

    return movie ? (
      <div className={classes.root}>
        <Card>
          <CardMedia
            component="img"
            image={`${config.api.backdrop_base_url(1)}/${movie.backdrop_path}`}
          />
          <CardContent>
            <Grid container justify="space-between">
              <Grid item>
                <Typography gutterBottom variant="headline" component="h2">
                  {movie.title || movie.original_title || movie.original_name || movie.name}
                </Typography>
              </Grid>
              <Grid item>
                <MoviePopularity popularity={movie.popularity} votes={movie.vote_average} />
              </Grid>
            </Grid>
            <Typography gutterBottom component="p" variant="body1">
              {movie.overview}
            </Typography>
            <Grid container justify="flex-end" alignItems="center">
              <Typography color="textSecondary" className={classes.item} title="Revenue">
                {movie.revenue ? (
                  <Fragment>
                    <MoneyIcon className={classes.icon} />
                    &nbsp;
                    <span>{this.formateNum(movie.revenue)}</span>
                  </Fragment>
                ) : null}
              </Typography>
              <Typography color="textSecondary" className={classes.item} title="Runtime">
                {movie.runtime ? (
                  <Fragment>
                    <TimeIcon className={classes.icon} />
                    &nbsp;
                    <span>{movie.runtime} min</span>
                  </Fragment>
                ) : null}
              </Typography>
              <Typography color="textSecondary" className={classes.item} title="Release date">
                <span>Release: {movie.release_date || 'Unknown'}</span>
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </div>
    ) : (
      <LinearProgress color="secondary" />
    )
  }
}

export default withStyles(styles)(Details)
