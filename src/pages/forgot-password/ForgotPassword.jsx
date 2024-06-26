import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, IconButton, Stack } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/Logo';
import ForgotForm from './components/ForgotForm';
// components
import { AuthSocial, Iconify, Page } from 'src/components';
// import LoginForm from './components/LoginForm';
//files
import illustration_login from 'src/assets/media/illustration_login.png';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();

  return (
    <Page title='Login'>
      <RootStyle>
        <HeaderStyle>
          <Logo />

          {/*   {smUp && (
            <Typography variant='body2' sx={{ mt: { md: -2 } }}>
              Don’t have an account? {''}
              <Link variant='subtitle2' component={RouterLink} to='/register'>
                Get started
              </Link>
            </Typography>
          )} */}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant='h3' sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src={illustration_login} alt='login' />
          </SectionStyle>
        )}

        <Container maxWidth='sm'>
          <ContentStyle>
            <Stack direction='row' alignItems='center' justifyContent='end'>
              <IconButton onClick={() => navigate(-1)}>
                <Iconify icon='akar-icons:arrow-left' />
              </IconButton>
            </Stack>
            <Typography variant='h4' gutterBottom>
              Reset Password
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 3 }}>Enter your email below.</Typography>

            {/* <AuthSocial /> */}

            <ForgotForm />

            {/*      {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{' '}
                <Link variant="subtitle2" component={RouterLink} to="/register">
                  Get started
                </Link>
              </Typography>
            )} */}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
