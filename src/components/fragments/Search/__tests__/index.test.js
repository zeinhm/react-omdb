import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import Search from '../Search';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(cb => {
    cb({});
    return {
      state: {
        isLoadingAutoComplete: false
      }
    };
  }),
}));

jest.mock('react-router-dom', () => ({
  useHistory: () => ({ push: jest.fn() }),
}));

describe('src/components/fragments/Search', ()=> {
  test('Search', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Search />);
    useSelector.mockImplementationOnce(() => ({
      state: {
        isLoadingAutoComplete: true
      }
    }));
    expect(tree).toMatchSnapshot();
  });
});
