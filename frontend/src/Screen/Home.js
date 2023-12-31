import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import StudentData from './Student/StudentData';
import SubjectData from './Subject/SubjectData';
import apiHelper from '../API/ApiHelper';

const drawerWidth = 240;

function Home(props) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [subject, setsubject] = React.useState([])

    
    const ShowSubject = async () => {
        try {
            const result = await apiHelper.GetSubject()
            if (result && result.status === 200) {
                setsubject(result.data.subject)
            }

        } catch (error) {

        }
    }


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <List>
                <ListItem sx={{ width: "100%" }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <MailIcon />Home
                        </ListItemIcon>
                        <ListItemText />
                    </ListItemButton>
                </ListItem>
                <ListItem sx={{ width: "100%" }}>
                    <ListItemButton>
                        <ListItemIcon sx={{ width: "100%" }}>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText />
                    </ListItemButton>
                </ListItem>

            </List>
        </div>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `100%` },
                    zIndex: "1000000",
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Responsive drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <div className='row'>
                    <div className=" col-12 col-lg-8 mb-5"><StudentData subject={subject}/></div>
                    <div className=" col-12 col-lg-4 "><SubjectData ShowSubject={ShowSubject} subject={subject} /></div>
                </div>
            </Box>
        </Box>



    );
}
export default Home;
