import { useState } from "react";
import Calculator from "./components/my-calculator/MyCalculator";
import ToggleButton from "./components/ui/ToggleButton/ToggleButton";
import styled from "styled-components";

function App() {
  const [hasSwitchedView, setSwitchedView] = useState(false);

  const handleToggleChange = () => {
    setSwitchedView(!hasSwitchedView);
  };

  return (
    <div className="App">
      <Container>
        <BodyCopy>Click here to switch view</BodyCopy>
        <ToggleButton
          labelChecked="On"
          labelUnchecked="Off"
          buttonID="checkbox_1"
          handleToggleChange={handleToggleChange}
        />
      </Container>
      <Calculator hasSwitchedView={hasSwitchedView} />
    </div>
  );
}

const Container = styled.div`
  max-width: 790px;
  margin: 1rem auto 0;
  display: flex;
  justify-content: center;

  @media (max-width: 414px) {
    display: none;
  }
`;

const BodyCopy = styled.p`
  position: relative;
  top: -10px;
  margin-right: 10px;
`;

export default App;
