import {makeStyles} from '@material-ui/styles';

const authenStyles = makeStyles({
  container: {
    width: '80%',
    maxWidth: '450px',
    height: 510,
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  input: {
    color: 'red',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 4,
    marginTop: '1.5rem'
  },

  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%'
  },

  button: {
    color: 'white',
    backgroundColor: 'red',
    marginTop: '3rem',
    padding: '.7rem',
    '&:hover': {
      backgroundColor: 'rgba(255, 0, 0, 0.7)'
    },
  }

});

export default authenStyles;