import React from "react";
import styled from "styled-components";
import { BsThreeDotsVertical, BsArrowUpShort } from "react-icons/bs";

const InfoCard = ({ name, number, percentage }) => {
  return (
    <Card>
      <CardSubContainer>
        <Text>{name}</Text>
        <BsThreeDotsVertical />
      </CardSubContainer>
      <CardSubContainer>
        <h1>{number}</h1>
        <Button>
          <BsArrowUpShort fill="green" /> {percentage}
        </Button>
      </CardSubContainer>
    </Card>
  );
};
const Card = styled.div`
  width: 250px;
  height: 105px;
  padding: 12px;
  /* border: 1px solid gray; */
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 10px;
`;
const CardSubContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Text = styled.p`
  letter-spacing: 2px;
  color: gray;
  margin-left: 10px;
`;

const Button = styled.div`
  border: none;
  border-radius: 20px;
  height: 30px;
  background-color: #7fff00;
  padding: 4px;
  color: #228b22;
`;

export default InfoCard;
