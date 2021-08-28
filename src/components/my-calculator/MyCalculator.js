import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Button from "../ui/Button/Button";
import { calculate } from "./calculate";

import {
  operatorsHorizontal,
  operatorsVertical,
  numKeypads,
} from "./constant.json";

const MyCalculator = () => {
  const [displayNumber, setDisplayNumber] = useState(0);
  const [previousSelectedOperator, setPreviousSelectedOperator] = useState("");
  const [currentNumber, setCurrentNumber] = useState(0);
  const [previousNumber, setPreviousNumber] = useState(0);
  const [hasDecimalSelected, setDecimalSelected] = useState(false);

  useEffect(() => {
    /*
     * if user select decimal at the beginning, we want to display decimal in screen
     * */
    if (hasDecimalSelected) {
      setDisplayNumber(currentNumber);
    }
  }, [hasDecimalSelected]);

  /* calculate the numbers and get result to screen */
  const getResult = () => {
    let output = calculate(previousNumber)(previousSelectedOperator.name)(
      currentNumber
    );
    setPreviousNumber(output);
    setCurrentNumber(0);
    DisplayScreen(output);
  };

  /* Display on screen */
  const DisplayScreen = (number) => {
    //if number has decimal, do not format
    const formatNumber = hasDecimalSelected
      ? number
      : new Intl.NumberFormat().format(number);
    setDisplayNumber(formatNumber);
  };

  /**
   * handle operators
   *
   * @param e
   * @param operator
   */
  const handleOperator = (e, operator) => {
    //reset all
    if (operator.name === "clear") {
      setDisplayNumber(0);
      setPreviousSelectedOperator("");
      setCurrentNumber(0);
      setPreviousNumber(0);
      setDecimalSelected(false);
    }
    if (
      operator.name === "add" ||
      operator.name === "subtract" ||
      operator.name === "divide" ||
      operator.name === "multiply"
    ) {
      if (previousNumber === 0) {
        setPreviousNumber(currentNumber);
      } else if (previousSelectedOperator !== "" && currentNumber !== 0) {
        getResult();
      }
      setPreviousSelectedOperator(operator);
      setCurrentNumber(0);
    }

    if (operator.name === "equals") {
      getResult();
    }

    if (operator.name === "percentage") {
      const output = displayNumber.replace(/[,]/g, "") / 100;
      DisplayScreen(output);
    }
    setDecimalSelected(false);
  };

  /**
   * handle number key pads
   * @param e
   * @param keypad
   */
  const handleNumPad = (e, keypad) => {
    const keyContent = keypad.name;
    let number;
    /*
     * decimal handling
     *
     * 1. can enter at the beginning 0.34
     * 2. can enter after number selected 12.34
     * 3. if decimal is already selected, do not add again
     * */
    if (keypad.value === null && !hasDecimalSelected && currentNumber === 0) {
      setDecimalSelected(true);
      setCurrentNumber(0 + keyContent);
    } else if (hasDecimalSelected && keypad.value === null) {
      return false;
    } else if (keypad.value === null) {
      setDecimalSelected(true);
      setCurrentNumber(currentNumber + keyContent);
    } else {
      if (currentNumber === 0) {
        number = keyContent;
      } else {
        number = currentNumber + keyContent;
      }
      DisplayScreen(number);
      setCurrentNumber(number);
    }
  };

  return (
    <Calculator>
      <CalculatorDisplay>
        <ResultText>{displayNumber}</ResultText>
      </CalculatorDisplay>
      <CalculatorKeyPad>
        <FirstColumn>
          <Block>
            {operatorsHorizontal.map((operator) => (
              <Button
                horizontalOperator
                key={operator.name}
                onClick={(e) => handleOperator(e, operator)}
              >
                {operator.symbol}
              </Button>
            ))}
          </Block>
          <Block>
            {numKeypads.map((keyPad) => (
              <__NumPadButtons
                numPads
                key={keyPad.name}
                onClick={(e) => handleNumPad(e, keyPad)}
              >
                {keyPad.name}
              </__NumPadButtons>
            ))}
          </Block>
        </FirstColumn>
        <SecondColumn>
          <VerticalOperatorWrapper>
            {operatorsVertical.map((operator) => (
              <Button
                verticalOperator
                key={operator.name}
                onClick={(e) => handleOperator(e, operator)}
              >
                <__VerticalOperatorButton symbol={operator.name}>
                  {operator.symbol}
                </__VerticalOperatorButton>
              </Button>
            ))}
          </VerticalOperatorWrapper>
        </SecondColumn>
      </CalculatorKeyPad>
    </Calculator>
  );
};

export default MyCalculator;

const Calculator = styled.div`
  width: 310px;
  margin: 0 auto;
  background-color: #000;
  color: #fff;
  padding: 0.938rem 0.625rem;
`;

const CalculatorDisplay = styled.div`
  text-align: right;
`;

const ResultText = styled.h1`
  overflow: hidden;
`;

const CalculatorKeyPad = styled.div`
  display: flex;
`;

const FirstColumn = styled.div`
  margin-right: 0.625rem;
`;

const SecondColumn = styled.div``;

const Block = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  column-gap: 0.625rem;
  row-gap: 0.313rem;
  margin-bottom: 0.313rem;
  justify-items: center;
`;

const VerticalOperatorWrapper = styled.div`
  display: grid;
  justify-items: center;
  row-gap: 0.313rem;
`;

const __VerticalOperatorButton = styled.span`
  position: relative;
  ${({ symbol }) => {
    if (symbol === "add" || symbol === "equals" || symbol === "subtract") {
      return css`
        top: -0.313rem;
      `;
    } else if (symbol === "multiply") {
      return css`
        top: 0.25rem;
      `;
    } else if (symbol === "divide") {
      return css`
        top: -0.25rem; ;
      `;
    }
  }}
`;

const __NumPadButtons = styled(Button)`
  ${(props) =>
    props.numPads &&
    css`
      &:nth-child(10) {
        grid-column: 1 / span 2;
        width: 80%;
        border-radius: 37px;
        padding-left: 1.25rem;
        justify-content: unset;
      }
    `}
`;
