/*
 * displayNumber, setDisplayNumber                          => display section.
 * selectedNumber, setSelectedNumber                        => to format numbers
 * hasDecimalSelected, setDecimalSelected                   => flag to check if decimal has selected
 * hasNumberSelected, setNumberSelected                     => flag to check if number has selected
 * hasOperatorSelected, setOperatorSelected                 => flag to check if operator has selected
 * expressions, setExpressions                              => expression to calculate numbers
 * previousNumber, setPreviousNumber                        => get the previous number
 * hasNegativeOperatorSelected, setNegativeOperatorSelected => flag to check if negative operator has selected
 * selectedOperator, setSelectedOperator                    => set the latest selected operator
 * history, setHistory                                      => logging history
 *
 * */
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Button from "../ui/Button/Button";
import PropTypes from "prop-types";

import {
  operatorsHorizontal,
  operatorsVertical,
  numKeypads,
  otherSymbols,
} from "./constant.json";

const MyCalculator = ({ hasSwitchedView }) => {
  const [displayNumber, setDisplayNumber] = useState(0);
  const [resultOutput, setResultOutput] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [hasDecimalSelected, setDecimalSelected] = useState(false);
  const [hasOperatorSelected, setOperatorSelected] = useState(false);
  const [expressions, setExpressions] = useState(null);
  const [previousNumber, setPreviousNumber] = useState(0);
  const [hasNegativeOperatorSelected, setNegativeOperatorSelected] =
    useState(false);
  const [selectedOperator, setSelectedOperator] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (previousNumber) {
      //display formatted number
      const formatNumber = new Intl.NumberFormat().format(previousNumber);
      //if decimal is selected, forcefully show it to screen.
      if (hasDecimalSelected) {
        setDisplayNumber(previousNumber);
      } else if (hasNegativeOperatorSelected) {
        setDisplayNumber("-" + formatNumber);
      } else {
        setDisplayNumber(formatNumber);
      }
    }
  }, [previousNumber, hasDecimalSelected, hasNegativeOperatorSelected]);

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
      setDecimalSelected(false);
      setSelectedNumber(0);
      setExpressions(null);
      setPreviousNumber();
      setNegativeOperatorSelected(false);
    }

    if (operator.name === "negative") {
      if (!hasNegativeOperatorSelected) {
        //if the number is already selected and tap on negative operator
        if (selectedNumber > 0) {
          setExpressions("parseFloat(-" + selectedNumber + ")");
        } else {
          setExpressions(operator.operator);
        }
        setDisplayNumber("-" + displayNumber);
      } else {
        setExpressions(null);
        setDisplayNumber(0);
      }
      setNegativeOperatorSelected(!hasNegativeOperatorSelected);
    }

    //when user tap operator and display number is 0, do nothing
    if (displayNumber === 0) return;

    if (
      operator.name === "add" ||
      operator.name === "subtract" ||
      operator.name === "divide" ||
      operator.name === "multiplication"
    ) {
      setSelectedNumber(0);
      setDecimalSelected(false);
      setNegativeOperatorSelected(false);
      setOperatorSelected(true);
      setSelectedOperator(operator);
    }

    if (operator.name === "equals") {
      let result = eval(expressions);
      setResultOutput(result);
      setDisplayNumber(new Intl.NumberFormat().format(result));
      const replacedExpression = expressions
        .replace(/parseFloat/, "")
        .replace(/[(]/, "")
        .replace(/[)]/, "");
      const addHistoryToList = [
        ...history,
        { expressions: replacedExpression, result: result },
      ];
      setHistory(addHistoryToList);
      setOperatorSelected(false);
    }

    if (operator.name === "percentage") {
      let result = (resultOutput < 1 ) ? previousNumber / 100 : resultOutput / 100;
      setDisplayNumber(result);
      setExpressions("parseFloat(" + result + ")");
      setOperatorSelected(false);
    }
  };

  /**
   * handle number key pads
   * @param e
   * @param keypad
   */
  const handleNumPad = (e, keypad) => {
    const keyContent = keypad.name;
    let newData;
    // when user tap on decimal or 0 for the first time, do nothing
    if (displayNumber === 0 && (keypad.value === null || keypad.value === 0))
      return;
    // if user has already selected decimal, and tap again, do nothing
    if (hasDecimalSelected && keypad.value === null) return;
    // if decimal is tapped, set hasDecimalSelected to true
    if (keypad.value === null) {
      setDecimalSelected(true);
    }

    if (displayNumber === 0 || selectedNumber === 0) {
      newData = keyContent;
      setPreviousNumber(keyContent);
    } else {
      newData = selectedNumber + keyContent;
      setPreviousNumber(previousNumber + keyContent);
    }

    //if operator has selected, then add operator and keyCotent to expression
    if (hasOperatorSelected) {
      setExpressions(expressions + selectedOperator.operator + keyContent);
    } else {
      //check if operator exist in expression
      let operatorExist = false;
      if (expressions !== null) {
        for (let i = 0; i < operatorsVertical.length; i++) {
          if (expressions.indexOf(operatorsVertical[i].operator) > 0) {
            operatorExist = true;
          }
        }
      }
      if (operatorExist) {
        setExpressions(expressions + keyContent);
      } else {
        setExpressions("parseFloat(" + newData + ")");
      }
    }

    setSelectedNumber(newData);
    setOperatorSelected(false);
  };

  return (
    <Calculator landscapeView={hasSwitchedView}>
      <CalculatorDisplay>
        <ResultText>{displayNumber}</ResultText>
      </CalculatorDisplay>
      <CalculatorKeyPad>
        <BigColumn landscapeView={hasSwitchedView}>
          {otherSymbols.map((otherSymbol) => (
            <Button otherKeys key={otherSymbol.name}>
              {otherSymbol.symbol}
            </Button>
          ))}
        </BigColumn>
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
                {operator.symbol}
              </Button>
            ))}
          </VerticalOperatorWrapper>
        </SecondColumn>
      </CalculatorKeyPad>
    </Calculator>
  );
};

export default MyCalculator;

MyCalculator.propTypes = {
  hasSwitchedView: PropTypes.bool.isRequired,
};

const Calculator = styled.div`
  margin: 0 auto;
  background-color: #000;
  color: #fff;
  padding: 0.938rem 0.625rem;
  @media (max-width: 414px) {
    width: 310px;
  }
  ${(props) => (props.landscapeView ? "width: 790px" : "width: 310px")}
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

const BigColumn = styled.div`
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  column-gap: 0.625rem;
  row-gap: 0.313rem;
  margin-bottom: 0.313rem;
  justify-items: center;
  margin-right: 0.625rem;
  ${(props) => (props.landscapeView ? "display: grid;" : "display: none;")}

  @media (max-width: 414px) {
    display: none;
  };
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
