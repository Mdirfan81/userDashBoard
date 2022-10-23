import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Button,
  Card,
  Pagination,
} from "react-bootstrap";
import SideMenu from "../../components/SideMenu";
import { useSelector, useDispatch } from "react-redux";

import { ProSidebarProvider } from "react-pro-sidebar";
import InfoCard from "../../components/InfoCard";

import EditCard from "../../components/EditCard";
import _, { set } from "lodash";

import EditUser from "../../components/EditUser";

import {
  fetchAllUsers,
  getAllUser,
  getCurrentUser,
  fetchDeleteUser,
  deleteUser,
} from "../../store/features/user";
import { BiLeftIndent } from "react-icons/bi";

import Swal from "sweetalert2";
import CreateNewUser from "../../components/CreateNewUser";

const RowCol = () => {
  const [allUser, setAllUser] = useState();
  const [pagination, setPagination] = useState();
  const [active, setActive] = useState(0);

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);

  const [length, setLength] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [id, setId] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEditModel = () => setEditShow((prev) => !prev);

  const dispatch = useDispatch();
  const allUsersData = useSelector(getAllUser);
  const currentData = useSelector(getCurrentUser);

  async function renderUsers(start, end) {
    setLoading(true);
    let data = await allUsersData;
    if (data) {
      // console.log("Here waiting for data", data);
      // setLength(Math.round(_.size(allUsersData)));
      let tempLength = Math.floor(Math.round(_.size(allUsersData) / 5));

      let temp = [];
      // console.log("waitign ==>", start, end);
      for (let i = start; i < end; i++) {
        temp.push(allUsersData[i]);
      }

      let paginationArr = [];
      if (tempLength) {
        // console.log("The temp length ==>", tempLength);
        for (let i = 1; i <= tempLength; i++) {
          paginationArr.push(
            <Pagination.Item
              key={i}
              onClick={handlePagination}
              // active={i === active}
            >
              {i}
            </Pagination.Item>
          );
        }
        setPagination(paginationArr);
      }
      // console.log("Updating Temp Arr", temp);
      setAllUser(temp);
      setLoading(false);
      return;
    }
  }
  function handlePagination(e) {
    e.preventDefault();
    // let prevPage =1;
    if (e.target.innerHTML === "Next") {
      setStart(end);
      setEnd(parseInt(end) + 5);
      // prevPage++;
    }

    return;
  }

  useEffect(() => {
    renderUsers(start, end);
  }, [allUsersData, start, end]);

  function handleDelete(e, id) {
    e.preventDefault();
    console.log("handleDelete", id);
    dispatch(deleteUser(id));
    dispatch(fetchDeleteUser(id));
  }

  function handleEdit(e, id) {
    e.preventDefault();
    console.log("handle Edit", id);
    handleEditModel();
    setId(id);
  }

  return (
    <Container fluid style={{ heigth: "100%" }}>
      <Row>
        <Col lg={3} sm={4}>
          <ProSidebarProvider>
            <SideMenu currentUser={currentData} />
          </ProSidebarProvider>
        </Col>
        <Col lg={{ span: 9 }} sm={{ span: 8 }}>
          <Container fluid>
            <Row>
              <Col lg={5} style={{ margin: "0px", padding: "0px" }}>
                <h1>Users Dashboard</h1>
              </Col>
              <Col lg={7} className="p-2 ">
                <Container
                  style={{
                    position: "relative",
                    right: "-250px",
                  }}
                >
                  <Button
                    variant="light"
                    style={{ marginRight: "20px" }}
                    size="sm"
                  >
                    Import
                  </Button>
                  <Button size="sm" onClick={handleShow}>
                    + Add customer
                  </Button>
                  <CreateNewUser
                    show={show}
                    handleClose={handleClose}
                    handleShow={handleShow}
                  />
                </Container>
              </Col>
            </Row>
          </Container>
          <Container fluid>
            <Nav className="me-auto">
              <Nav.Link>Overview</Nav.Link>
              <Nav.Link>Table</Nav.Link>
              <Nav.Link>List view</Nav.Link>
              <Nav.Link>Segment</Nav.Link>
              <Nav.Link>Custom</Nav.Link>
            </Nav>
            <hr />
            <Container
              style={{
                display: "flex",
                gap: "50px",
              }}
            >
              <InfoCard name="Total Customer" number="2,420" percentage="20%" />
              <InfoCard name="Members" number="1,210" percentage="15%" />
              <InfoCard name="Active Now" number="316" />
            </Container>
            <Container>
              <Card
                style={{
                  width: "100%",
                  height: "355px",
                  padding: "10px",
                  marginTop: "10px",
                  overflow: "hidden",
                }}
              >
                {isLoading && <h1>Loading</h1>}
                {allUser &&
                  allUser.map((user, index) => (
                    <EditCard
                      key={index}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                      id={user.id}
                      img={user.image}
                      firstName={user.first_name}
                      lastName={user.last_name}
                    />
                  ))}
              </Card>
              <Pagination
                style={{
                  marginTop: "10px",
                }}
              >
                <Pagination.Item onClick={handlePagination} className="">
                  Next
                </Pagination.Item>
              </Pagination>
            </Container>
          </Container>
        </Col>
      </Row>
      <EditUser
        show={editShow}
        handleShow={handleEditModel}
        // handleShow={handleShow}
        id={id}
      />
    </Container>
  );
};

export default RowCol;
