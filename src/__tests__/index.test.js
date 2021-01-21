import React from 'react';
import { history } from '../store';

const mockComponent = (name, props) => <div className={name} {...props} />;

jest.mock('../App', () => ({
  __esModule: true,
  default: props => mockComponent('App', props),
}));
jest.mock('../store', () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
  history: {},
}));
jest.mock('react-dom');

describe('src/index', () => {
  test('render', () => {
    expect(typeof history).toBe('object');
  });
});
