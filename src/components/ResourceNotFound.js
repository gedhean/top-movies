import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import SvgNoContent from './NoContent'

const ResourceNotFound = props => {
  return (
    <div style={{ textAlign: 'center', paddingTop: 24 }}>
      <Typography variant="inherit" component="h3" color="textSecondary">
        {props.info}
      </Typography>
      <SvgNoContent />
    </div>
  )
}

ResourceNotFound.propTypes = {
  info: PropTypes.string
}

export default ResourceNotFound
