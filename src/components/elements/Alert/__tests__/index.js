import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Alert, { Content } from '../Alert';
import { AlertContext } from '../../../../contexts';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: v => v,
  useEffect: cb => cb(),
  useState: v => [v === 'tes' ? v : !v, jest.fn()],
}));

jest.mock('../../../../contexts', () => ({
  AlertContext: {
    alert: '',
    setAlert: jest.fn(),
  },
}));

describe('src/components/elements/Alert', () => {
  test('render', () => {
    Alert.defaultProps.onClose();
    Alert.defaultProps.onClose = jest.fn();
    Alert(Alert.defaultProps);
    expect(AlertContext.setAlert).toHaveBeenNthCalledWith(1, null);
    expect(Alert.defaultProps.onClose).toHaveBeenCalled();

    const openProps = { ...Alert.defaultProps, open: true };
    const { className, children } = Alert.defaultProps;
    const contentProps = { children, className, };
    AlertContext.alert = 'test';
    Alert(openProps);
    expect(AlertContext.setAlert).toHaveBeenNthCalledWith(2, <Content {...contentProps} />);

    AlertContext.alert = 'test';
    Alert(Alert.defaultProps);
  });

  test('Content', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Content />);
    expect(tree).toMatchSnapshot();
  });
});
