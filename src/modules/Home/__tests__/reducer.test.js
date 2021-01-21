import { SUCCESS, LOADING, FAILED } from '../constants';
import reducer from '../reducer';

describe('src/pages/Home/reducer', () => {
  test('Home', async () => {
    const result1 = reducer(undefined, { data: 'sukses', type: SUCCESS, key: 'Test' });
    expect(result1.dataTest).toBe('sukses');

    const result2 = reducer(undefined, { isLoading: true, type: LOADING, key: 'Test' });
    expect(result2.isLoadingTest).toBe(true);

    const result3 = reducer(undefined, { message: 'test', type: FAILED, key: 'Test' });
    expect(result3.message).toBe('test');

    const result4 = reducer('tes', { type: 'default' });
    expect(result4).toBe('tes');
  });
});
