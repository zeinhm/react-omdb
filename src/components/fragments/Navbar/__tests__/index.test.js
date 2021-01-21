import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Navbar from '../Navbar';

describe('src/components/fragments/Navbar', ()=> {
  test('Navbar', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Navbar />);
    expect(tree).toMatchSnapshot();
  });
});
