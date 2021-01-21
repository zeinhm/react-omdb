import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import LoadingSpin from '../LoadingSpin';

describe('src/components/elements/LoadingSpin', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<LoadingSpin />);
    expect(tree).toMatchSnapshot();
  });
});
