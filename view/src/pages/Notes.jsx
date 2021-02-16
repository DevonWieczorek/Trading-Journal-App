import React, { Component } from 'react'

import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';
import DialogBox from '../components/DialogBox';
import { authMiddleWare } from '../util/auth';

const styles = ((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
	floatingButton: {
		position: 'fixed',
		bottom: 0,
		right: 0
	},
	form: {
		width: '98%',
		marginLeft: 13,
	},
	toolbar: theme.mixins.toolbar,
	root: {
		minWidth: 470
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	pos: {
		marginBottom: 12
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
	},
    })
);

const CreateNoteDialog = ({ title, body, onOpen, onClose, onChange, onSubmit, buttonType, classes, errors }) => (
    <DialogBox
        title={buttonType === 'Edit' ? 'Edit Note' : 'Create a new Note'}
        onOpen={onOpen}
        onClose={onClose}
    >
        <form className={classes.form} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="todoTitle"
                        label="Title"
                        name="title"
                        autoComplete="todoTitle"
                        helperText={errors.title}
                        value={title}
                        error={errors.title ? true : false}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="todoDetails"
                        label="Details"
                        name="body"
                        autoComplete="todoDetails"
                        multiline
                        rows={25}
                        rowsMax={25}
                        helperText={errors.body}
                        error={errors.body ? true : false}
                        onChange={onChange}
                        value={body}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onSubmit}
                    >
                        {buttonType === 'Edit' ? 'Save' : 'Submit'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    </DialogBox>
);

const ViewNoteDialog = ({ title, body, onOpen, onClose }) => (
    <DialogBox
        title={title}
        onOpen={onOpen}
        onClose={onClose}
    >
        <TextField
            fullWidth
            id="noteDetails"
            name="body"
            multiline
            readonly
            rows={1}
            rowsMax={25}
            value={body}
            InputProps={{
                disableUnderline: true
            }}
        />
    </DialogBox>
);

const NoteCard = ({ item, classes, onOpenClick, onEditClick, onDeleteClick }) => (
    <Grid item xs={12} sm={6}>
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2">
                    {item.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {dayjs(item.createdAt).fromNow()}
                </Typography>
                <Typography variant="body2" component="p">
                    {`${item.body.substring(0, 65)}`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={onOpenClick}>
                    {' '}
                    View{' '}
                </Button>
                <Button size="small" color="primary" onClick={onEditClick}>
                    Edit
                </Button>
                <Button size="small" color="primary" onClick={onDeleteClick}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    </Grid>
);

class Notes extends Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: '',
			title: '',
			body: '',
			todoId: '',
			errors: [],
			open: false,
			uiLoading: true,
			buttonType: '',
			viewOpen: false
		};

		this.deleteTodoHandler = this.deleteTodoHandler.bind(this);
		this.handleEditClickOpen = this.handleEditClickOpen.bind(this);
		this.handleViewOpen = this.handleViewOpen.bind(this);
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	componentWillMount = () => {
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/todos')
			.then((response) => {
				this.setState({
					todos: response.data,
					uiLoading: false
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	deleteTodoHandler(data) {
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		let todoId = data.todo.todoId;
		axios
			.delete(`todo/${todoId}`)
			.then(() => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	handleEditClickOpen(data) {
		this.setState({
			title: data.todo.title,
			body: data.todo.body,
			todoId: data.todo.todoId,
			buttonType: 'Edit',
			open: true
		});
	}

	handleViewOpen(data) {
		this.setState({
			title: data.todo.title,
			body: data.todo.body,
			viewOpen: true
		});
	}

	render() {
		dayjs.extend(relativeTime);
		const { classes } = this.props;
		const { open, errors, viewOpen } = this.state;

		const handleClickOpen = () => {
			this.setState({
				todoId: '',
				title: '',
				body: '',
				buttonType: '',
				open: true
			});
		};

		const handleSubmit = (event) => {
			authMiddleWare(this.props.history);
			event.preventDefault();
			const userTodo = {
				title: this.state.title,
				body: this.state.body
			};
			let options = {};
			if (this.state.buttonType === 'Edit') {
				options = {
					url: `/todo/${this.state.todoId}`,
					method: 'put',
					data: userTodo
				};
			} else {
				options = {
					url: '/todo',
					method: 'post',
					data: userTodo
				};
			}
			const authToken = localStorage.getItem('AuthToken');
			axios.defaults.headers.common = { Authorization: `${authToken}` };
			axios(options)
				.then(() => {
					this.setState({ open: false });
					window.location.reload();
				})
				.catch((error) => {
					this.setState({ open: true, errors: error.response.data });
					console.log(error);
				});
		};

		const handleViewClose = () => {
			this.setState({ viewOpen: false });
		};

		const handleClose = (event) => {
			this.setState({ open: false });
		};

		if (this.state.uiLoading === true) {
			return (
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
				</main>
			);
		} else {
			return (
				<main className={classes.content}>
					<div className={classes.toolbar} />

					<Grid container spacing={2}>
						{this.state.todos.map((todo) => (
                            <NoteCard
                                item={todo}
                                classes={classes}
                                onOpenClick={() => this.handleViewOpen({ todo })}
                                onEditClick={() => this.handleEditClickOpen({ todo })}
                                onDeleteClick={() => this.deleteTodoHandler({ todo })}
                            />
						))}
					</Grid>

                    <IconButton
						className={classes.floatingButton}
						color="primary"
						aria-label="Add Note"
						onClick={handleClickOpen}
					>
						<AddCircleIcon style={{ fontSize: 60 }} />
					</IconButton>

                    <CreateNoteDialog
                        title={this.state.title}
                        body={this.state.body}
                        buttonType={this.state.buttonType}
                        onOpen={open}
                        onClose={handleClose}
                        onChange={this.handleChange}
                        onSubmit={handleSubmit}
                        classes={classes}
                        errors={errors}
                    />

                    <ViewNoteDialog
                        title={this.state.title}
                        body={this.state.body}
                        onOpen={viewOpen}
                        onClose={handleViewClose}
                    />
				</main>
			);
		}
	}
}

export default withStyles(styles)(Notes);
