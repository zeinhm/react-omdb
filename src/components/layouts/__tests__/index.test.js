import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PageBase from '../PageBase';

jest.mock('../../../contexts', () => ({
  ModalContext: {
    content: '',
    setContent: jest.fn(),
  },
  AlertContext: {
    alert: '',
    setAlert: jest.fn(),
  },
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: v => v,
  useEffect: cb => cb(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => jest.fn()),
}));

describe('src/components/layouts/PageBase', ()=> {
  test('PageBase', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PageBase />);
    expect(tree).toMatchSnapshot();
  });
});
