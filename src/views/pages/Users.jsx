import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { ProSidebarProvider } from "react-pro-sidebar";
import SideMenu from "../../components/SideMenu";
import { Nav, NavLink, Container } from "react-bootstrap";
import {
  fetchAllUsers,
  getAllUser,
  getCurrentUser,
} from "../../store/features/user";

const Users = () => {
  const dispatch = useDispatch();
  const allUsersData = useSelector(getAllUser);
  const currentData = useSelector(getCurrentUser);

  console.log({ allUsersData }, "\n", { currentData });

  return (
    <MainContainer>
      <MenuContainer>
        <Menu>
          <ProSidebarProvider>
            <SideMenu currentUser={currentData} />
          </ProSidebarProvider>
        </Menu>
      </MenuContainer>
      <BodyContainer>
        <Container>hfjksdhljfkhkjsdakfhk</Container>
        <Container>
          <Nav className="me-auto">
            <Nav.Link>Overview</Nav.Link>
            <Nav.Link>Table</Nav.Link>
            <Nav.Link>List view</Nav.Link>
            <Nav.Link>Segment</Nav.Link>
            <Nav.Link>Custom</Nav.Link>
          </Nav>
        </Container>
      </BodyContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 8;
  /* grid-template-rows: 1; */
`;
const MenuContainer = styled.div``;
const MenuIcon = styled.div``;
const Menu = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  width: 100%;
  height: 100%;
  /* border: 2px solid green; */

  @media (min-width: 768px) {
    width: 0px;
  }
`;
const BodyContainer = styled.div`
  grid-column-start: span 3;
  grid-column-end: 5;
  /* border: 2px solid red; */
  width: 100%;
  height: 100%;
`;
// const Container = styled.div``;
// const MainContainer = styled.div``

export default Users;
