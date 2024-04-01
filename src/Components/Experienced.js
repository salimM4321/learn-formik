import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, TextField, Typography, Box, Grid, InputLabel, MenuItem, Chip, FormControl } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    dob: Yup.date().required('Date of Birth is required'),
    totalExperience: Yup.number()
        .transform(value => parseFloat(parseFloat(value).toFixed(1)))
        .typeError('Total Experience must be a number')
        .positive('Total Experience must be a positive number')
        .min(0.1, 'Total Experience must be a positive number')
        .max(50, 'Total Experience cannot be more than 50')
        .required('Total Experience is required'),
    relevantExperience: Yup.number()
        .typeError('Relevant Experience must be a number')
        .test(
            'decimal-check',
            'Only two decimal points allowed',
            value => {
                const decimalCount = value.toString().split('.')[1]?.length || 0;
                return decimalCount <= 2;
            }
        )
        .positive('Relevant Experience must be a positive number')
        .min(0, 'Relevant Experience must be a positive number')
        .max(50, 'Relevant Experience cannot be more than 50')
        .required('Relevant Experience is required'),
    accomplishments: Yup.string().required('Accomplishments/Achievements are required'),
    highestEducation: Yup.string().required('Highest Education is required'),
    resume: Yup.mixed().required('Resume is required'),
    expectedCTC: Yup.number()
        .typeError('Expected CTC must be a number')
        .positive('Expected CTC must be a positive number')
        .max(20000000, 'Expected CTC cannot exceed 2 crores')
        .required('Expected CTC is required'),
    currentCTC: Yup.number()
        .typeError('Current CTC must be a number')
        .positive('Current CTC must be a positive number')
        .max(20000000, 'Current CTC cannot exceed 2 crores')
        .required('Current CTC is required'),
    noticePeriod: Yup.string().required('Notice Period is required'),
    otherEducation: Yup.string().when('highestEducation', {
        is: 'Other',
        then: Yup.string().required('Please specify your education')
    }),
    softSkills: Yup.array()
        .of(Yup.string())
        .min(1, 'Please select at least one soft skill')
        .required('Please select at least one soft skill'),
    technicalSkills: Yup.array().when('highestEducation', {
        is: 'Technical',
        then: Yup.array().required('Please select at least one technical skill'),
    }),
});

const softSkillsList = [
    'Communication',
    'Teamwork',
    'Problem Solving',
    'Time Management',
    'Leadership',
    'Adaptability',
    // Add more soft skills as needed
];

const technicalSkillsList = [
    'Python',
    'Java',
    'Javascript',
    'C',
    'C++',
    'Kotlin',
    'React',
    'Next Js',
    'MySQL',
    'MongoDB',
    'PostgreSQL',
    'Amazon Web Service(AWS)',
    'Microsoft Azure',
    'Google Cloud Platform (GCP)',
    // Add more technical skills as needed
];

const Experienced = () => {
    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} md={8} lg={6} xl={4}>
                <Box p={4} border={1} borderColor="grey" borderRadius={5}>
                    <Typography variant="h5" align="center">Experienced Apply</Typography>
                    <Formik
                        initialValues={{
                            dob: '',
                            totalExperience: '',
                            relevantExperience: '',
                            accomplishments: '',
                            highestEducation: '',
                            resume: null,
                            expectedCTC: '',
                            currentCTC: '',
                            noticePeriod: '',
                            otherEducation: '',
                            softSkills: [],
                            technicalSkills: [],
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                        {({ isSubmitting, errors, touched, setFieldValue, values }) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    name="dob"
                                    label="Date of Birth"
                                    type="date"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    error={Boolean(errors.dob && touched.dob)}
                                    helperText={<ErrorMessage name="dob" />}
                                />

                                <Field
                                    as={TextField}
                                    name="totalExperience"
                                    label="Total Experience (in years)"
                                    type="number"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    error={Boolean(errors.totalExperience && touched.totalExperience)}
                                    helperText={<ErrorMessage name="totalExperience" />}
                                />

                                <Field
                                    as={TextField}
                                    name="relevantExperience"
                                    label="Relevant Experience"
                                    type="number"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    error={Boolean(errors.relevantExperience && touched.relevantExperience)}
                                    helperText={<ErrorMessage name="relevantExperience" />}
                                />

                                <Field
                                    as={TextField}
                                    name="accomplishments"
                                    label="Accomplishments/Achievements"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    error={Boolean(errors.accomplishments && touched.accomplishments)}
                                    helperText={<ErrorMessage name="accomplishments" />}
                                />

                                <Field
                                    as={TextField}
                                    select
                                    name="highestEducation"
                                    label="Highest Education"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    error={Boolean(errors.highestEducation && touched.highestEducation)}
                                    helperText={<ErrorMessage name="highestEducation" />}
                                    onChange={(event) => {
                                        const { value } = event.target;
                                        if (value === "Other") {
                                            setFieldValue("otherEducation", "");
                                        }
                                    }}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value="High School">High School</MenuItem>
                                    <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                                    <MenuItem value="Graduate">Graduate</MenuItem>
                                    <MenuItem value="Post Graduate">Post Graduate</MenuItem>
                                    <MenuItem value="Doctorate">Doctorate</MenuItem>
                                    <MenuItem value="Technical">Technical</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Field>

                                {values.highestEducation === "Other" && (
                                    <Field
                                        as={TextField}
                                        name="otherEducation"
                                        label="Other Education"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        error={Boolean(errors.otherEducation && touched.otherEducation)}
                                        helperText={<ErrorMessage name="otherEducation" />}
                                    />
                                )}

                                {values.highestEducation === "Technical" && (
                                    <FormControl fullWidth variant="outlined" margin="normal">
                                        <InputLabel id="technicalSkills-label">Technical Skills</InputLabel>
                                        <Field
                                            name="technicalSkills"
                                        >
                                            {({ field, meta }) => (
                                                <Autocomplete
                                                    multiple
                                                    {...field}
                                                    id="technicalSkills"
                                                    options={technicalSkillsList}
                                                    freeSolo // Allow typing to add new items
                                                    getOptionLabel={(option) => option}
                                                    onChange={(e, value) => setFieldValue("technicalSkills", value)}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
                                                            label="Technical Skills"
                                                            fullWidth
                                                            multiline // Add multiline property
                                                            rows={2} // Set the number of rows to display initially
                                                            InputProps={{ ...params.InputProps, style: { minHeight: '48px' } }} // Set minimum height for the input field
                                                            InputLabelProps={{ shrink: true }} // Ensure the InputLabel shrinks when focused
                                                        />
                                                    )}
                                                    renderTags={(value, getTagProps) =>
                                                        value.map((option, index) => (
                                                            <Chip key={index} label={option} {...getTagProps({ index })} />
                                                        ))
                                                    }
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage name="technicalSkills" render={msg => <Typography variant="body2" color="error">{msg}</Typography>} />
                                    </FormControl>
                                )}

                                <FormControl fullWidth variant="outlined" margin="normal">
                                    <InputLabel  variant="outlined" id="softSkills-label"></InputLabel>
                                    <Field
                                        name="softSkills"
                                    >
                                        {({ field, meta }) => (
                                            <Autocomplete
                                                multiple
                                                {...field}
                                                id="softSkills"
                                                options={softSkillsList}
                                                freeSolo // Allow typing to add new items
                                                getOptionLabel={(option) => option}
                                                onChange={(e, value) => setFieldValue("softSkills", value)}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        label="softSkills"
                                                        fullWidth
                                                        multiline // Add multiline property
                                                        rows={2} // Set the number of rows to display initially
                                                        InputProps={{ ...params.InputProps, style: { minHeight: '48px' } }} // Set minimum height for the input field
                                                        InputLabelProps={{ shrink: true }} // Ensure the InputLabel shrinks when focused
                                                    />
                                                )}
                                                renderTags={(value, getTagProps) =>
                                                    value.map((option, index) => (
                                                        <Chip key={index} label={option} {...getTagProps({ index })} />
                                                    ))
                                                }
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="softSkills" render={msg => <Typography variant="body2" color="error">{msg}</Typography>} />
                                </FormControl>

                                <input
                                    id="resume"
                                    name="resume"
                                    type="file"
                                    onChange={(event) => {
                                        setFieldValue("resume", event.currentTarget.files[0]);
                                    }}
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="resume">
                                    <Button
                                        variant="outlined"
                                        component="span"
                                        fullWidth
                                        style={{ marginTop: '1rem' }}
                                    >
                                        Upload Resume
                                    </Button>
                                </label>
                                {touched.resume && errors.resume && (
                                    <Typography variant="body2" color="error">{errors.resume}</Typography>
                                )}

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    fullWidth
                                    style={{ marginTop: '1rem' }}
                                >
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Experienced;
