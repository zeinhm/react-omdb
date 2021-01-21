import { rootReducer } from '../index';

jest.mock('redux', () => ({
  combineReducers: v => v,
}));

describe('src/reducers', () => {
  test('reducer', () => {
    expect(typeof rootReducer).toBe('object');
  });
});
