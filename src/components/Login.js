
import '../App.css';
import {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'   



const schema = Yup.object({
  username: Yup.string()
    .min(2)
    .max(50 )
    .required(),
  password: Yup.string().min(5).required(),
});

export default function Login() {

    let history = useHistory();

    const [loginResp, setLoggedIn] =useState('');
    

  function onSubmit (values) {
    var data = JSON.stringify(values);
    var config = {
        method: 'post',
        url: 'http://127.0.0.1:3000/login',
        headers: { 
            'Content-Type': 'application/json',
        },
        data : data
        };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        'token' in response.data ? history.push("/home"):setLoggedIn(response.data.status)
    })
    .catch(function (error) {
        console.log(error);
    });


    
  }
  return (
    <div className="center">
        {loginResp!=="" &&<Alert  variant={'danger'}>
            {loginResp}
        </Alert>}
          <Card class="card"> 
                <h2>Login</h2>
              <Formik
                validationSchema={schema}
                onSubmit={onSubmit}
                initialValues={{
                  username: '',
                  password: '',
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  isValid,
                  errors,
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group controlId="validationFormik01">
                      <Form.Label>Username</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Enter Username" 
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        isValid={touched.username && !errors.username} 
                        isInValid={!!errors.username}
                        />
                    </Form.Group>

                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>

                    <Form.Group controlId="validationFormik02">
                      <Form.Label>Password</Form.Label>
                      <Form.Control 
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isValid={touched.password && !errors.password} 
                        isInValid={!!errors.password}  />
                    </Form.Group>
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                    <Button type="submit" disabled={!isValid}>Login</Button>
                  </Form>
                )}
            </Formik>
         
          </Card>
      
    </div>
  );
}


