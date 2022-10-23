import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

import { Form, Button, Alert, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchCreateUser,
  fetchAllUsers,
  fetchUpdateUser,
  fetchSingleUsers,
} from "../store/features/user";

const EditUser = ({ show, handleShow, id }) => {
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  // const [userOldData, setUserOldData] = useState();

  console.log("Edit Modal", id);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
  });
  let { firstName, lastName, email, avatar } = formData;

  const history = useHistory();
  const dispatch = useDispatch();

  function handleChange(e) {
    setError(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (firstName && lastName && email && avatar) {
      setError(false);
      let payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        avatar: avatar,
      };
      // payload = JSON.stringify(payload);
      console.log("\n\nUpdating \n\n", payload, "\n\nUpdating \n\n");
      let response = await dispatch(fetchUpdateUser(id, payload));

      if (response.payload.status === "success") {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "New User Created",
          showConfirmButton: false,
          timer: 1200,
        });
        handleShow();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed ! Try Again",
          showConfirmButton: false,
          timer: 1200,
        });
        setLoading(false);
      }
    } else {
      setError(true);
    }
  }

  // async function SingleUser(id) {
  //   let result = await dispatch(fetchSingleUsers(id));
  //   console.log("The result", result.payload.data.email);

  //   setLoading(false);
  //   console.log(result.payload.data.email);
  //   return;
  // }
  // useEffect(() => {
  //   // dispatch(fetchSingleUsers(id))
  //   setLoading(true);
  //   if (show) {
  //     SingleUser(id);
  //   }
  // }, [id, show]);

  return (
    <Modal show={show} onHide={handleShow}>
      {isLoading && <h1>Loading ...</h1>}
      <Modal.Header closeButton>
        <Modal.Title>Edit User </Modal.Title>
      </Modal.Header>
      <MainContainer>
        <>
          <Modal.Body
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Form style={{ width: "22rem" }} onSubmit={(e) => handleSubmit(e)}>
              {error && <Alert variant="danger">Fill the form</Alert>}

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="firstName"
                  type="text"
                  placeholder="Enter First Name"
                  onChange={handleChange}
                  minLength="4"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  minLength="4"
                  name="lastName"
                  type="text"
                  placeholder="Enter Last Name"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter Email Address"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Avatar</Form.Label>
                <Form.Control
                  minLength="6"
                  name="avatar"
                  type="url"
                  placeholder="Paste the Image Url"
                  onChange={handleChange}
                />
              </Form.Group>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                }}
              >
                <Button variant="secondary" onClick={handleShow}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  // onClick={(e) => handleSubmit(e)}
                >
                  {isLoading ? "Submitting" : "Submit"}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </>
      </MainContainer>
    </Modal>
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
  height: 35rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* gap: 10px; */
  border-radius: 10px;
  margin-top: 20px;
`;
const Header = styled.h2`
  display: flex;
  justify-content: center;
  letter-spacing: 2px;
`;
export default EditUser;
