import React, { useState } from "react";
import styled from "styled-components";

/**
 * buttonId => unique and mandatory
 * handleToggleButton => change event
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Index = (props) => {
  const {
    variant = "primary",
    buttonID,
    labelChecked,
    labelUnchecked,
    handleToggleChange
  } = props;
  const [isChecked, setChecked] = useState(props.defaultState);

  const handleChange = (event) => {
    setChecked(!isChecked);
    handleToggleChange(event);
  };

  return (
    <ToggleButton className={`${variant}`}>
      <CheckBox
        id={buttonID}
        name="checkboxToggle"
        defaultChecked={isChecked}
        onChange={handleChange}
      />
      <Label htmlFor={buttonID}>
        <ToggleSwitch
          data-checked={labelChecked ? labelChecked : ""}
          data-unchecked={labelUnchecked ? labelUnchecked : ""}
        />
      </Label>
    </ToggleButton>
  );
};

export default Index;

const ToggleSwitch = styled.div`
  height: 32px;
  width: 100%;
  border-radius: 60px;
  background: ${(props) => props.theme.colour.bodyColor};
  transition: background-color 0.3s cubic-bezier(0.86, 0, 0.07, 1);
  box-sizing: border-box;
  color: ${(props) => props.theme.colour.whiteColor};
  position: relative;
  font-size: 14px;
  &:before {
    content: attr(data-unchecked);
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translate(-50%, -50%);
  }
  &:after {
    content: "";
    position: absolute;
    transform: translate3d(0, 0, 0);
    top: 3px;
    left: 3px;
    border-radius: 30px;
    width: 30px;
    height: 26px;
    z-index: 5;
    background-color: ${(props) => props.theme.colour.whiteColor};
    transition: transform 0.3s cubic-bezier(0.86, 0, 0.07, 1);
  }
`;

const Label = styled.label`
  display: flex;
  position: relative;
  cursor: pointer;
`;

const CheckBox = styled.input.attrs({
  type: "checkbox"
})`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  &:checked {
    ~ ${Label} {
      ${ToggleSwitch} {
        background-color: ${(props) => props.theme.colour.success};
        &:before {
          content: attr(data-checked);
          top: 50%;
          left: 25%;
          transform: translate(-37%, -50%);
          text-align: center;
        }
        &:after {
          transform: translate3d(38px, 0, 0);
        }
      }
    }
  }
`;

const ToggleButton = styled.div`
  position: relative;
  width: 75px;
  height: 60px;

  &.primary {
    ${CheckBox}:checked {
      ~ ${Label} {
        ${ToggleSwitch} {
          background-color: ${(props) => props.theme.colour.primary};
        }
      }
    }
  }

  &.default {
    ${CheckBox}:checked {
      ~ ${Label} {
        ${ToggleSwitch} {
          background-color: ${(props) => props.theme.colour.success};
        }
      }
    }
  }
`;