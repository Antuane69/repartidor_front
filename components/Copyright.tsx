import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      align="center"
      {...props}
      sx={[
        {
          color: 'text.secondary',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {'Copyright © '}
      <a href="https://www.hotelbuenaventura.com.mx/" target="_blank" rel="noopener noreferrer" style={{color: '#000000', textDecoration: 'underline'}}>
        Hoteles Buenaventura {' '} {new Date().getFullYear()}{'.'}
      </a>
    </Typography>
  );
}
