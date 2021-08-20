import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MyCalculator from "../MyCalculator";
configure({ adapter: new Adapter() });

describe("My Calculator", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MyCalculator hasSwitchedView={true} />);
  });
  test("landscape view should be boolean", () => {
    let landscapeview = wrapper.props().landscapeView;
    expect(typeof landscapeview === "boolean").toBeTruthy();
  });
});
