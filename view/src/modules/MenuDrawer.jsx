import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NotesIcon from '@material-ui/icons/Notes';
import Avatar from '@material-ui/core/avatar';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import withStyles from '@material-ui/core/styles/withStyles';

const drawerWidth = 240;

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	avatar: {
		height: 110,
		width: 100,
		flexShrink: 0,
		flexGrow: 0,
		marginTop: 20
	},
	toolbar: theme.mixins.toolbar
});

const MenuDrawer = ({ classes, user, onTodoClick, onAccountClick, onLogoutClick }) => (
    <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
            paper: classes.drawerPaper
        }}
    >
        <div className={classes.toolbar} />
        <Divider />
        <center>
            <Avatar src={user.profilePicture} className={classes.avatar} />
            <p>
                {' '}
                {user.firstName} {user.lastName}
            </p>
        </center>
        <Divider />
        <List>
			<Link href="/trades">
				<ListItem button key="Trades" onClick={onTodoClick}>
					<ListItemIcon>
						{' '}
						<SwapHorizIcon />{' '}
					</ListItemIcon>
					<ListItemText primary="Trades" />
	            </ListItem>
			</Link>

			<Link href="/notes">
	            <ListItem button key="Notes" onClick={onTodoClick}>
						<ListItemIcon>
		                    {' '}
		                    <NotesIcon />{' '}
		                </ListItemIcon>
		                <ListItemText primary="Notes" />
	            </ListItem>
			</Link>


			<Divider />

			<Link href="/account">
				<ListItem button key="Account" onClick={onAccountClick}>
	                <ListItemIcon>
	                    {' '}
	                    <AccountBoxIcon />{' '}
	                </ListItemIcon>
	                <ListItemText primary="Account" />
	            </ListItem>
			</Link>

            <ListItem button key="Logout" onClick={onLogoutClick}>
                <ListItemIcon>
                    {' '}
                    <ExitToAppIcon />{' '}
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItem>
        </List>
    </Drawer>
);

export default withStyles(styles)(MenuDrawer);
