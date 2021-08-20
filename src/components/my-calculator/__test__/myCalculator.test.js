import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MyCalculator from '../MyCalculator';
configure({ adapter: new Adapter() });

describe("My Calculator", ()=> {
  let wrapper;
  beforeEach(()=> {
    wrapper = shallow(<MyCalculator />)
  });
  test('variant should be primary by default', ()=> {
    expect(wrapper.props().className).toEqual('primary');
  });
})