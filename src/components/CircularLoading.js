import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
}

const CircularLoading = (props) => {
    return (
        <div style={styles}>
          <CircularProgress {...props}/>              
        </div>
    );
};

export default CircularLoading;