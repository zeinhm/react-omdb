import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import DetailMovie from '../DetailMovie';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(cb => {
    cb({});
    return {
      state: {
        dataMovieDetail: {},
        isLoadingMovieDetail: false
      }
    };
  }),
}));

describe('src/components/fragments/DetailMovie', ()=> {
  test('DetailMovie', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DetailMovie />);
    
    useSelector.mockImplementationOnce(() => ({
      state: {
        dataMovieDetail: {},
        isLoadingMovieDetail: false
      }}));
    expect(tree).toMatchSnapshot();
  });
});
