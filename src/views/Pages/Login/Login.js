import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {
  Button, Card, CardBody,
  CardGroup, Col, Container,
  Form, Input, InputGroup,
  InputGroupAddon, InputGroupText, Row,
} from 'reactstrap';
import useForm from '../../../services/custom-hooks';
import {loginRequest, clearActionResultLogin} from '../../../store/actions';
import {loginValidator} from '../../../services/validators';

const initialState = {
  username: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loginResult = useSelector(state => state.login);
  const {status, errorMessage} = loginResult;

  const {
    inputs, errors,
    generateError,
    boundHandleFieldChange, handleSubmit,
  } = useForm({initialState, action: loginRequest, formValidator: loginValidator});

  if (status === 'success') {
    dispatch(clearActionResultLogin());
    history.push('/');
  } else if (status === 'fail') {
    dispatch(clearActionResultLogin());
    generateError({login: errorMessage});
  }

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={boundHandleFieldChange}
                        name='username'
                        type="text"
                        value={inputs['username']}
                        placeholder="Username"
                        autoComplete="username"
                      />
                    </InputGroup>
                    {errors.username && <Row>{errors.username}</Row>}
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={boundHandleFieldChange}
                        type="password"
                        name='password'
                        value={inputs['password']}
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </InputGroup>
                    {errors.password && <Row>{errors.password}</Row>}
                    {errors.login && <Row>{errors.login}</Row>}
                    <Row>
                      <Col xs="6">
                        <Button
                          type='submit'
                          color="primary"
                          className="px-4"
                        >
                          Login
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
