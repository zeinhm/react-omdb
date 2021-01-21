import React from 'react';
import { useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import MovieList, { ModalPoster } from '../MovieList';

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

describe('src/components/fragments/MovieList', ()=> {
  test('MovieList', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<MovieList />);
    
    useSelector.mockImplementationOnce(() => ({
      state: {
        dataMovieDetail: {},
        isLoadingMovieDetail: false
      }}));
    expect(tree).toMatchSnapshot();
  });
  test('ModalPoster', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ModalPoster />);
    ModalPoster.defaultProps.onClose();
    expect(tree).toMatchSnapshot();

    const result = ModalPoster({ ...ModalPoster.defaultProps, open: true });
    result.props.onClose();
    result.props.children[1].props.onClick();
  });
});
