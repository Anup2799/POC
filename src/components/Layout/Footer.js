import React from 'react';
import { styled } from '@mui/material/styles';

const FooterContainer = styled('div')({
  backgroundColor: 'black',
  color: 'white',
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center', // Center the content horizontally
});

const Footer = () => {
  return (
    <FooterContainer>
      <div style={{ fontWeight: 'bold' }}>© 2023 Zensar</div>
    </FooterContainer>
  );
};

export default Footer;
