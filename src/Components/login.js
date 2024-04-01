import React, { useState } from 'react';
import { TextField, Button, Typography, Container, makeStyles } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

const onSubmit = (values, { setSubmitting, resetForm }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    resetForm();
  }, 400);
};

const LoginForm = () => {
  const classes = useStyles();
  const [submittedData, setSubmittedData] = useState(null);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {submittedData ? <pre>Data is passed: {JSON.stringify(submittedData, null, 2)}</pre> : <pre>No data passed</pre>}


      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          onSubmit(values, actions);
          setSubmittedData(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              helperText={<ErrorMessage name="email" render={msg => <span style={{ color: 'red' }}>{msg}</span>} />}
            />
            <Field
              as={TextField}
              type="password"
              name="password"
              label="Password"
              fullWidth
              margin="normal"
              variant="outlined"
              helperText={<ErrorMessage name="password" render={msg => <span style={{ color: 'red' }}>{msg}</span>} />}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              className={classes.submitButton}
            >
              {isSubmitting ? 'Submitting' : 'Submit'}
            </Button>
          </Form>
        )}
      </Formik>
      {submittedData && (
        <div className={classes.submittedData}>
          <Typography variant="h6" gutterBottom>
            Submitted Data
          </Typography>
          <Typography>
            Email: {submittedData.email}
          </Typography>
          <Typography>
            Password: {submittedData.password}
          </Typography>
        </div>
      )}
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  submitButton: {
    marginTop: theme.spacing(2),
  },
  submittedData: {
    marginTop: theme.spacing(2),
    border: '1px solid #ccc',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
}));

export default LoginForm;
