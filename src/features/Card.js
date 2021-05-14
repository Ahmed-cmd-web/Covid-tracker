/** @format */

import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { reducer3 } from "./reducer";

const Card = (props) => {
  const dispatch = useDispatch();
  return (
    <Container
      onClick={(e) => {
        dispatch(reducer3(props));

        return e.preventDefault;
      }}
      href="#"
    >
      <span className="tar" style={{ backgroundColor: props.pcolor }}></span>
      <Content>
        <h5>{props.title}</h5>
        <h2 style={{ color: props.color }}>+{props.num}</h2>
        <span>{props.sub} Total</span>
      </Content>
    </Container>
  );
};

const Container = styled.a`
  background-color: white;
  border: 1px solid gainsboro;
  border-radius: 5px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 32.5%;
  height: 130px;
  color: grey;
  &  h5 {
    flex-wrap: wrap;
    width: 60%;
  }

  flex-direction: column;
  box-shadow: -1px 7px 5px 3px gainsboro;
  transition: all 0.2s ease;
  @media only screen and (min-width: 501px) {
    box-shadow: -1px 7px 5px 3px gainsboro;
  }
  @media only screen and (max-width: 500px) {
    box-shadow: none;
  }

  text-decoration: none;
  cursor: pointer;
  .tar {
    display: none;
    width: 100%;
    height: 10%;
    border-top: 1px transparent black;
    border-bottom: none;
    border-radius: 2px;
  }
  &:active .tar,
  &:focus .tar {
    display: flex;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  padding: 10px;
  width: 100%;
  height: 100%;
  & > * {
    margin: 0;
  }
`;

export default Card;
