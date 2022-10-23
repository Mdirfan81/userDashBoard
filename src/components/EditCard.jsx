import React, { useEffect } from "react";
import styled from "styled-components";

import { MdDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";

const EditCard = ({
  handleDelete,
  handleEdit,
  img,
  firstName,
  lastName,
  id,
}) => {
  useEffect(() => {}, [handleDelete, handleEdit, img, firstName, lastName, id]);
  // console.log(img, firstName, lastName, id);
  return (
    <Cart>
      <Detail>
        <Circle>
          <Image
            src={
              img
                ? img
                : "https://mobimg.b-cdn.net/v3/fetch/05/05eeb93a2e41734ecb6044146351f11e.jpeg"
            }
          ></Image>
        </Circle>

        <HeaderText>
          {firstName} {lastName}
        </HeaderText>

        <ButtonContainer>
          <Button name={id} onClick={(e) => handleDelete(e, id)}>
            <MdDelete size={25} />
          </Button>
          <Button name={id} onClick={(e) => handleEdit(e, id)}>
            <FiEdit2 size={20} />
          </Button>
        </ButtonContainer>
      </Detail>
    </Cart>
  );
};

const Cart = styled.div`
  width: 100%;
  height: 55px;
  /* border: 1px solid red; */
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  display: flex;
  border-radius: 10px;
  padding-left: 5px;
  margin: 10px;
`;
const Circle = styled.div`
  width: 50px;
  height: 50px;
  overflow: hidden;
  /* border: 2px solid black; */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  /* padding: 10px; */
`;
const Image = styled.img`
  height: 80px;
  padding: 10px;
`;
const Detail = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const HeaderText = styled.p`
  font-size: 25px;
  font-weight: 500;
  letter-spacing: 2px;
  margin: 0px;
  color: gray;
`;
const Badge = styled.div``;
const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;
const Button = styled.button`
  border: none;
  border-radius: 50%;
  background-color: transparent;
`;
export default EditCard;
