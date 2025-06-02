import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  Box // Agrega Box si no lo tienes
} from '@mui/material';
import { 
  People, 
  DirectionsWalk, 
  Assessment, 
  Dashboard as DashboardIcon,
  Description as DescriptionIcon 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          
          <ListItem button component={Link} to="/employees">
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Empleados" />
          </ListItem>
          
          <ListItem button component={Link} to="/access">
            <ListItemIcon>
              <DirectionsWalk />
            </ListItemIcon>
            <ListItemText primary="Control de Accesos" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to="/reports/daily">
            <ListItemIcon>
              <Assessment />
            </ListItemIcon>
            <ListItemText primary="Reporte Diario" />
          </ListItem>
          
          <ListItem button component={Link} to="/reports/employee">
            <ListItemIcon>
              <Assessment />
            </ListItemIcon>
            <ListItemText primary="Reporte por Empleado" />
          </ListItem>

          <ListItem button component="a" href="/swagger-ui.html" target="_blank">
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Documentación API" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;