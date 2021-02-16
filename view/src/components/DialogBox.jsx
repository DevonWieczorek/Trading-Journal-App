import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Fade from '@material-ui/core/Fade';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';

const styles = ((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    title: {
		marginLeft: theme.spacing(2),
		flex: 1
	},
	root: {
		minWidth: 470
	},
	dialogeStyle: {
		maxWidth: '50%'
	},
	viewRoot: {
		margin: 0,
		padding: theme.spacing(2)
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
    })
);

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Fade ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    viewRoot: {
        padding: theme.spacing(2)
    }
}))(MuiDialogContent);

const DialogBox = ({ title, onClose, onOpen, classes, children }) => (
    <Dialog
        onClose={onClose}
        aria-labelledby="dialog-title"
        open={onOpen}
        fullWidth
        classes={{ paperFullWidth: classes.dialogeStyle }}
        TransitionComponent={Transition}
    >
        <DialogTitle id="dialog-title" onClose={onClose}>
            {title}
        </DialogTitle>
        <DialogContent dividers>
            {children}
        </DialogContent>
    </Dialog>
);

export default withStyles(styles)(DialogBox);
