import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Container, 
  FormControl, 
  InputLabel, 
  Select,
  Paper,
  Slider,
  TextareaAutosize,
  MenuItem
} from '@material-ui/core'; // Import components from @material-ui/core
import { BsCloudUploadFill } from 'react-icons/bs';
import { makeStyles } from '@material-ui/core/styles'; // Import makeStyles from @material-ui/core/styles
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const useStyles = makeStyles(() => ({
  root: {
    padding: '16px', // You can set the padding directly here
    margin: 'auto',
    maxWidth: 600,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px', // You can set the gap directly here
  },
  uploadButton: {
    marginTop: '16px', // You can set the margin top directly here
  },
}));

const categories = ['Personal', 'Career', 'Travel', 'Family', 'Friends', 'Other'];

const EventForm = () => {
  const classes = useStyles(); // Use the makeStyles hook
  const [eventName, setEventName] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
    key: 'selection',
  });
  const [category, setCategory] = useState('');
  const [emotionalScore, setEmotionalScore] = useState(0);
  const [eventNote, setEventNote] = useState('');
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // Simulate an upload progress
    let progressValue = 0;
    const interval = setInterval(() => {
      if (progressValue >= 100) {
        clearInterval(interval);
      } else {
        progressValue += 10;
        setProgress(progressValue);
      }
    }, 500);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Data to be submitted:', {
      eventName,
      dateRange,
      category,
      emotionalScore,
      eventNote,
      selectedFile,
    });

    // Create a FormData object to store all the data to be submitted
    const formData = new FormData();
    formData.append('eventName', eventName);
    formData.append('dateRange', dateRange);
    formData.append('category', category);
    formData.append('emotionalScore', emotionalScore);
    formData.append('eventNote', eventNote);
    formData.append('selectedFile', selectedFile);

    try {
      const response = await fetch('http://localhost:8080/api/eventAdd', {
        method: 'POST',
        body: formData,
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        // body: JSON.stringify({ key: 'value' }), // Your data goes here
      });
  
      if (response.ok) {
        console.log('Data submitted successfully!');
        const responseData = await response.json(); // Parse response data as JSON
        console.log(responseData);
        // Reset the form after successful submission
        setEventName('');
        setDateRange({  startDate: null, endDate: null, key: 'selection' });
        setCategory('');
        setEmotionalScore(0);
        setEventNote('');
        setProgress(0);
        setSelectedFile(null);
      } else {
        console.error('Failed to submit data.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Paper elevation={3} className={classes.form}>

        <form onSubmit={handleSubmit}>
          {/** Event Name */}
          <TextField
            label="Event Name"
            fullWidth
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            margin="normal"
          />
          {/** Date */}
          {/* <TextField
            label="Date"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            margin="normal"
          /> */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Date Range</InputLabel>
            <br></br>
            <br></br>
            <DateRangePicker
              ranges={[dateRange]}
              onChange={(ranges) => setDateRange(ranges.selection)}
            />
          </FormControl>
          {/** Category */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/** Emotional Score */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Emotional Score: {emotionalScore}</InputLabel>
            <br></br><br></br>
            <Slider
              value={emotionalScore}
              onChange={(event, newValue) => setEmotionalScore(newValue)}
              valueLabelDisplay="auto"
              step={5}
              marks
              min={-100}
              max={100}
            />
          </FormControl>
          {/** Notes */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Notes</InputLabel>
            <br></br><br></br>
            {/* <Typography variant="subtitle1">Notes</Typography> */}
            <TextareaAutosize
              rowsMin={4} // Adjust the minimum number of rows
              placeholder="Describe your event here"
              value={eventNote}
              onChange={(e) => setEventNote(e.target.value)}
              style={{ height: '100px', marginTop: '8px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </FormControl>

          {/** Upload Photo */}
          <br></br><br></br>
          <Typography variant="body2" color="textSecondary">
            Please attach most representative photo of your event.
          </Typography>
          <LinearProgress variant="determinate" value={progress} />
          <Button
  variant="contained"
  component="label"
  startIcon={<BsCloudUploadFill />}
  className={classes.uploadButton}
>
  Upload File
  <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
</Button>



          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!selectedFile}
            className={classes.uploadButton}
          >
            Upload
          </Button>
          
          {/** Submit Button */}
          <br></br><br></br>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.uploadButton}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          </form>
      </Paper>
      </Container>
  );
};

export default EventForm;