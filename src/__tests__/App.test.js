// import React from 'react';
// import ReactDOM from 'react-dom';
// // import store from '../store';

// const mockComponent = (name, props) => <div className={name} {...props} />;

// jest.mock('../App', () => ({
//   __esModule: true,
//   default: props => mockComponent('App', props),
// }));
// jest.mock('../store', () => ({
//   __esModule: true,
//   default: jest.fn(() => ({})),
//   history: {},
// }));
// jest.mock('react-dom');

// describe('src/index', () => {
//   test('render', () => {
//     // expect(store).toHaveBeenCalledTimes(1);
//     expect(ReactDOM.render).toHaveBeenCalledTimes(0);
//   });
// });

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import App from '../App';

describe('src/App', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const store = {
      dispatch: jest.fn(),
      getState: jest.fn(),
      subscribe: jest.fn(),
    };
    const tree = shallow.render(<App history={{}} store={store} />);
    expect(tree).toMatchSnapshot();
  });
});

