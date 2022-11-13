import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CreateIcon from '@mui/icons-material/Create';
import ViewListIcon from '@mui/icons-material/ViewList';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { Navigate } from 'react-router-dom';
import { Link } from '@mui/material';
import LinkBehavior from './LinkBehavior';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      position: 'static',
      width: drawerWidth,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );
  
  export default function AdminSidebar(selectedElement) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleIcons = (index) => {
      switch (index) {
        case 0:
          return <CreateIcon />;
        case 1:
          return <ViewListIcon />;
        case 2:
          return <AccountCircleIcon />;
        case 3:
          return <SettingsIcon />;
        default:
          break;
      }
    }

    const handleLinks = (index) => {
      switch (index) {
        case 0:
          return "/dashboard";
        case 1:
          return "/dashboard/posts";
        case 2:
          return "/dashboard/accounts";
        case 3:
          return "/dashboard/settings";
        default:
          return "/";
      }
    }
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
  
    return (
        <Drawer variant="permanent" open={open} sx={{[`& .MuiDrawer-paper`]: { boxSizing: 'border-box', height:'100%' }}}>
            <Toolbar />
          <List>
            {['Create', 'Posts', 'Users', 'Settings'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <Link component={LinkBehavior} link={handleLinks(index)} underline={"hover"} color={'inherit'}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    selected={(index === selectedElement.selectedElement) ? true : false} 
                    title={text}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {handleIcons(index)}
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Drawer>
    )
}