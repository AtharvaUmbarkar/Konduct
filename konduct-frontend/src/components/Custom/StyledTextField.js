import { TextField } from '@mui/material';
import { withStyles } from '@material-ui/styles';

const StyledTextField = withStyles({
  root: {
    '& .MuiInputLabel-root': {
      color: '#EEEEEE',
    },
    '& .MuiInputBase-input': {
      color: '#EEEEEE',
    },
    '& .MuiFormLabel-filled': {
      color: '#00ADB5',
    },
    '& label.Mui-focused': {
      color: '#00ADB5',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#00ADB5',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#EEEEEE',
      },
      '&:hover fieldset': {
        borderColor: '#00ADB5',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00ADB5',
      },
    },
  },
})(TextField);

export default StyledTextField