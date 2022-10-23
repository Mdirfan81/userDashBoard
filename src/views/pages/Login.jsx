import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { fetchAuth, fetchAllUsers } from "../../store/features/user";

import { Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import Swal from "sweetalert2";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  let { email, password } = formData;

  const dispatch = useDispatch();
  const history = useHistory();

  function handleChange(e) {
    setError(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      setError(false);

      let payload = {
        email: email,
      };

      let callingAPi = await dispatch(fetchAuth(payload));
      if (callingAPi.payload.data.status === "success") {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Successfully Log-In",
          showConfirmButton: false,
          timer: 1200,
        });
        dispatch(fetchAllUsers());

        history.push("/user");
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed ! Try Again",
          showConfirmButton: false,
          timer: 1200,
        });
        // history.push("/");
        setLoading(false);
      }
    } else {
      setError(true);
    }
  }

  // const alert =
  // {isLoading && <Loader>Loading</Loader>}
  return (
    <MainContainer fluid className="xxl xl lg sm">
      <Container className="xxl xl lg sm">
        <Form
          style={{ width: "22rem" }}
          className="xl lg"
          onSubmit={(e) => handleSubmit(e)}
        >
          {error && <Alert variant="danger">Fill the form</Alert>}
          <Header>
            <h3>WEL COME</h3>
          </Header>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
              size="w-75"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={handleChange}
              minLength="5"
            />
            <Link to="/signup">
              <SignUpLink>Don't have a account ?</SignUpLink>
            </Link>
          </Form.Group>
          <Button variant="primary" type="submit" size="xl">
            {isLoading ? "Loading" : "Log In"}
          </Button>
        </Form>
      </Container>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 30rem;
  height: 30rem;
  /* border: 2px solid black; */
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* gap: 10px; */
  margin-top: 20px;
  border-radius: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  letter-spacing: 2px;
`;
const SignUpLink = styled.span`
  font-size: 15px;
  float: right;
  cursor: pointer;
  padding-top: 8px;
  &:hover {
    color: blue;
  }
  /* margin-left: 10px; */
`;

// const Loader = styled.h2`
// position: ab;
// `;
export default Login;
