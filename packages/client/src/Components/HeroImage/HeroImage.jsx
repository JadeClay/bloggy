import { Typography } from '@mui/material';
import { Stack } from '@mui/system'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import image from "../../images/background.jpg";

export default class HeroImage extends Component {
  static propTypes = {

    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,

    /* This is the Image Background of the HeroImage */
    image: PropTypes.string.isRequired
}

  render() {
    return (
      <Stack sx={{backgroundImage: `url(${image})`, backgroundSize: "cover", height: "30vh"}}>
        
        <Typography variant="h3" component="h2" color={'white'} align="center"
            sx={{
                paddingTop: {xs: 8, md: 6 },
        }}>
            {this.props.title}
        </Typography>

        <Typography variant="h5" component="h2" color={'gray'} align="center"
            sx={{
                paddingTop: 1,
                mb: {xs:5, md: 0},
        }}>
            {this.props.subtitle}
        </Typography>

      </Stack>
    )
  }
}
