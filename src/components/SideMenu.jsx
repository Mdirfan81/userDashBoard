import React from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";

import { FiUsers, FiSettings, FiMenu } from "react-icons/fi";
import { BiHomeSmile, BiSupport } from "react-icons/bi";
import { CgBox } from "react-icons/cg";
import { BsStack, BsListTask, BsPieChart } from "react-icons/bs";
import { MdNotificationsNone } from "react-icons/md";

import { Card } from "react-bootstrap";
import styled from "styled-components";

const SideMenu = ({ currentUser }) => {
  const { collapseSidebar } = useProSidebar();
  // console.log({ currentUser });
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar collapsedWidth="60px">
        <Menu>
          <div>
            <div>
              <MenuItem onClick={() => collapseSidebar()}>
                <FiMenu /> Menu
              </MenuItem>
              <MenuItem>
                <BiHomeSmile /> Home
              </MenuItem>
              <MenuItem>
                <CgBox /> Dashboard
              </MenuItem>
              <MenuItem>
                <BsStack /> Projects
              </MenuItem>
              <MenuItem>
                <BsListTask /> Tasks
              </MenuItem>
              <MenuItem>
                <BsPieChart /> Reporting
              </MenuItem>
              <MenuItem>
                <FiUsers /> Users
              </MenuItem>
            </div>
            <div
              style={{
                position: "relative",
                top: "30px",
              }}
            >
              <MenuItem>
                <MdNotificationsNone /> Notifications
              </MenuItem>
              <MenuItem>
                <BiSupport /> Support
              </MenuItem>
              <MenuItem>
                <FiSettings /> Setting
              </MenuItem>
              <MenuItem>
                {currentUser && (
                  <Card
                    style={{
                      height: "4rem",
                      display: "flex",
                      flexDirection: "row",
                      gap: "20px",
                      padding: "10px",
                      marginTop: "5px",
                    }}
                  >
                    <div className="image">
                      <Circle>
                        <Card.Img
                          variant=""
                          // src="https://image.shutterstock.com/image-illustration/triangle-solid-black-golden-illustration-260nw-1862937556.jpg"
                          src={currentUser.user.avatar}
                        ></Card.Img>
                      </Circle>
                    </div>
                    <div
                      className="Name"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Card.Text>
                        {currentUser.user.firstName}
                        {currentUser.user.lastName}
                      </Card.Text>
                    </div>
                  </Card>
                )}
              </MenuItem>
            </div>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
};
const Circle = styled.div`
  border-radius: 50%;
  height: 80px;
  width: 80px;
  overflow: hidden;

  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
`;

export default React.memo(SideMenu);
