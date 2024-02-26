import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link , useNavigate} from "react-router-dom";

const Login = () => {

  const navigate = useNavigate()
  
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const url = "http://localhost:8000/login";
  const data = { email, password };

  const handleApi = () => {
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        if(res.data.message){
          // eslint-disable-next-line no-lone-blocks
          {
            if(res.data.token){
              localStorage.setItem('token', res.data.token)
              navigate('/')
            }
          }
        }
      } )
      .catch((error) => console.log(`Error: ${error}`));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h1 className="text-center mb-4">Log In</h1>
          <Form>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" block onClick={handleApi}>
              Log In
            </Button>
            <br/>
            <p>Not Loged In? <Link to='/signup' > Signup </Link> </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
