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

export default function App() {
  const [tasks, setTasks] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [priority, setPriority] = React.useState('');
  const [deadline, setDeadline] = React.useState(moment());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    setTasks((a) => a.concat([task]));
    setOpen(false);
    toastr.success(`Task was added successfully`);
  }

  function deleteATask(title) {
    const removeItem = tasks.filter((task) => {
      task.title !== title;
    });
    setTasks(removeItem);
    toastr.success(`Task was deleted successfully`);
  }

  function updateATask(task) {}

  function openTaskUpdate(title) {
    let task = tasks.find((task) => task.title == title);
    setDescription(task.description);
    setTitle(task.title);
    setPriority(task.priority);
    setDeadline(task.deadline);
    setOpen(true);
  }

  function completeTask(title) {
    setTasks((a) =>
      a.map((task) =>
        task.title == title ? { ...task, isComplete: true } : task
      )
    );
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            Title
            error
            id="outlined-error-helper-text"
            label="Title"
            helperText="Title is Required!"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <br></br>
          <br></br>
          <TextField
            Description
            error
            id="outlined-error-helper-text"
            label="Description"
            helperText="Title is Required!"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
          <br></br>
          <br></br>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
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
          <Button
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
            Add
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
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
            <Button
              color="inherit"
              onClick={() => setOpen(true)} //addATask(createDataForTable(1, 2, 3, 4, 5, 6))}
            >
              {' '}
              Add{' '}
            </Button>
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
                      color="inherit"
                      onClick={() => openTaskUpdate(task.title)}
                    >
                      Update
                    </Button>
                  )}
                  <br></br>
                  <Button
                    color="inherit"
                    onClick={() => deleteATask(task.title)}
                  >
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
