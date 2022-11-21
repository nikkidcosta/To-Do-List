import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DoNotDisturbIcon from '@mui/icons-material/DoDisturb';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import './style.css';
import moment from 'moment';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BorderColorIcon from '@mui/icons-material/BorderColor';

export default function App() {
  const [tasks, setTasks] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [priority, setPriority] = React.useState('High');
  const [deadline, setDeadline] = React.useState(moment());
  const [titleError, setTitleError] = React.useState(false);
  const [descriptionError, setDescriptionError] = React.useState(false);
  const [uniqueTitleError, setUniqueTitleError] = React.useState(false);

  // false = add, true = update
  const [update, setUpdate] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    clearInputs();
    setOpen(false);
  };

  function clearInputs() {
    setTitle('');
    setDescription('');
    setPriority('High');
    setDeadline(moment());
    setTitleError(false);
    setDescriptionError(false);
    setUniqueTitleError(false);
  }

  function createDataForTable(
    title,
    description,
    deadline,
    priority,
    isComplete,
    action
  ) {
    return { title, description, deadline, priority, isComplete, action };
  }

  function addATask(task) {
    //console.log(task.deadline);
    //console.log(update);
    // console.log(description);
    if (
      !update &&
      description &&
      title &&
      tasks.filter((t) => t.title == task.title).length == 0
    ) {
      setTasks((a) => a.concat([task]));
      setOpen(false);
      clearInputs();
      toastr.success(`Task was added successfully`);
    } else if (update && description) {
      let taskToUpdate = tasks.find((t) => t.title == task.title);
      taskToUpdate.description = task.description;
      taskToUpdate.title = task.title;
      taskToUpdate.deadline = task.deadline;
      taskToUpdate.priority = task.priority;
      clearInputs();
      toastr.success('Task was updated successfully!');
      setOpen(false);
      //setTasks((a) => (a.title == task.title ? task : a));
    }
    // if task is not valid
    else {
      if (!title) {
        setTitleError(true);
      } else {
        setTitleError(false);
      }
      if (tasks.filter((t) => t.title == task.title).length != 0) {
        setUniqueTitleError(true);
      } else {
        setUniqueTitleError(false);
      }
      if (!description) {
        setDescriptionError(true);
      } else {
        setDescriptionError(false);
      }
    }
  }

  function deleteATask(title) {
    const removeItem = tasks.filter((task) => {
      task.title !== title;
    });
    setTasks(removeItem);
    toastr.success(`Task was deleted successfully`);
  }

  function openTaskUpdate(title) {
    let task = tasks.find((task) => task.title == title);
    setDescription(task.description);
    setPriority(task.priority);
    setDeadline(moment(task.deadline));
    setUpdate(true);
    setTitle(title);
    setOpen(true);
  }

  function openTaskAdd() {
    setOpen(true);
    setUpdate(false);
  }

  function completeTask(title) {
    setTasks((a) =>
      a.map((task) =>
        task.title == title ? { ...task, isComplete: true } : task
      )
    );
  }

  function updateTask(task) {
    addATask(
      createDataForTable(task.description, task.deadline, task.priority)
    );
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <AppBar sx={{ position: 'absolute' }} fullWidth>
            <Toolbar>
              {!update && <AddCircleIcon />}
              {update && <BorderColorIcon />}
              <Typography variant="h6" component="div">
                {!update && 'Add Task'}
                {update && 'Edit Task'}
              </Typography>
            </Toolbar>
          </AppBar>
          <br></br>
          <br></br>
          <br></br>
          {!update && (
            <TextField
              Title
              fullWidth
              error={titleError || uniqueTitleError}
              id="outlined-error-helper-text"
              label="Title"
              helperText={
                (titleError && 'Title is Required!') ||
                (uniqueTitleError && 'Title is already used!')
              }
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            />
          )}
          <br></br>
          <br></br>
          <TextField
            Description
            fullWidth
            error={descriptionError}
            id="outlined-error-helper-text"
            label="Description"
            helperText={descriptionError && 'Description is Required!'}
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
          <br></br>
          <br></br>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              fullWidth
              label="Deadline"
              value={deadline}
              onChange={(event) => {
                setDeadline(event);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <br></br>
          <br></br>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Priority
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(event) => setPriority(event.target.value)}
              value={priority}
            >
              <FormControlLabel value="High" control={<Radio />} label="High" />
              <FormControlLabel value="Med" control={<Radio />} label="Med" />
              <FormControlLabel value="Low" control={<Radio />} label="Low" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained"
            onClick={() =>
              addATask(
                createDataForTable(
                  title,
                  description,
                  deadline.format('MM/DD/YYYY'),
                  priority,
                  false
                )
              )
            }
          >
            {update && <BorderColorIcon />}
            {update && 'Edit'}
            {!update && <AddCircleIcon />}
            {!update && 'Add'}
          </Button>
          <Button color="error" variant="contained" onClick={handleClose}>
            {' '}
            <DoNotDisturbIcon /> Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 52 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              FRAMEWORKS
            </Typography>
            <IconButton
              aria-label="add"
              color="inherit"
              onClick={() => openTaskAdd()}
            >
              <AddCircleIcon />
              ADD
            </IconButton>
            {/*}
            <Button color="inherit" variant="contained" onClick={() => openTaskAdd()}>
              {' '}
              Add{' '}
          </Button>*/}
          </Toolbar>
        </AppBar>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Deadline</TableCell>
              <TableCell align="right">Priority</TableCell>
              <TableCell align="right">Is Complete</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow
                key={task.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {task.title}
                </TableCell>
                <TableCell align="right">{task.description}</TableCell>
                <TableCell align="right">{task.deadline}</TableCell>
                <TableCell align="right">{task.priority}</TableCell>
                <TableCell align="right">
                  <Checkbox
                    color="default"
                    inputProps={{
                      'aria-label': 'checkbox with default color',
                    }}
                    onChange={() => completeTask(task.title)}
                  />
                </TableCell>
                <TableCell align="right">
                  {!task.isComplete && (
                    <Button
                    variant="contained"
                      color="primary"
                      onClick={() => openTaskUpdate(task.title)}
                    >
                      <BorderColorIcon />
                      Update
                    </Button>
                  )}
                  <br></br>
                  <Button variant="contained"
                    color="error"
                    onClick={() => deleteATask(task.title)}
                  >
                    <DoNotDisturbIcon />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
