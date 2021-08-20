import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ToggleButton from './ToggleButton';

configure({ adapter: new Adapter() });

describe("Toggle Button", ()=> {
  test('variant should be primary by default', ()=> {
    const wrapper = shallow(<ToggleButton />);
    expect(wrapper.props().className).toEqual('primary');
  });

  test('buttonID is mandatory', ()=> {
    const wrapper = shallow(<ToggleButton />);
  })
})