import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const Index = (props) => <Button {...props}>{props.children}</Button>;

export default Index;

Index.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.element.isRequired,
  ]),
};

const Button = styled.div`
  background-color: #fff;
  border-radius: 50%;
  font-size: 22px;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${(props) =>
    props.horizontalOperator &&
    css`
      background-color: #c4c4c4;
      color: #000;

      &:hover {
        background-color: #ababab;
      }
    `}

  ${(props) =>
    props.numPads &&
    css`
      background-color: #404040;
      color: #fff;
    `}
  
  ${(props) =>
    props.otherKeys &&
    css`
      background-color: #404040;
      color: #fff;
    `}

  ${(props) =>
    props.verticalOperator &&
    css`
      background-color: #ffac1c;
      font-size: 25px;

      &:hover {
        background-color: #d68d0f;
      }
    `}
`;
