import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ToggleButton from "../ToggleButton";

configure({ adapter: new Adapter() });

describe("Toggle Button", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ToggleButton buttonID="buttonId" />);
  });
  test("variant should be primary by default", () => {
    expect(wrapper.props().className).toEqual("primary");
  });
});
