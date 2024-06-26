import { Container } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBackHeader, Page } from 'src/components';

const AddUser = () => {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate(-1);
  };
  return (
    <Page title='Add User'>
      <Container maxWidth='xl'>
        <NavBackHeader heading='Add User' />
      </Container>
    </Page>
  );
};

export default AddUser;
