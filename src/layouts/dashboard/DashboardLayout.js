import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

// ----------------------------------------------------------------------

const APP_BAR_DESKTOP = '8vh';
const APP_BAR_MOBILE = '8vh';

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100vh',
  overflow: 'hidden',
  paddingBottom: '0.1rem',
  // backgroundColor: 'grey',
  position: 'relative',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE,
  paddingTop: APP_BAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP,
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2),
  },
  // backgroundColor: 'green',
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // ------------------------------------
  const handleNavigate = () => {
    if (localStorage.getItem('token')) {
      if (pathname === '/') {
        navigate('/dashboard', { replace: true });
      }
    }
    if (!localStorage.getItem('token')) {
      navigate('/login', { replace: true });
    }
  };

  // ------------------------------------
  useEffect(() => {
    handleNavigate();
  }, [pathname]);
  // ------------------------------------
  if (!localStorage.getItem('token')) {
    return <Navigate to='/login' replace={true} />;
  }
  return (
    <RootStyle id='mui-root-style'>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle id='mui-main-style'>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
