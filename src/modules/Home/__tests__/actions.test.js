import { getAutoComplete } from '../actions';
import { fetchMovies } from '../../../utils/fetch';
import { LOADING, SUCCESS } from '../constants';


jest.mock('../../../utils/fetch', () => ({
  fetchMovies: jest.fn(),
}));
jest.fn().mockResolvedValue({ data: 'test' });
const dispatch = jest.fn();

describe('src/pages/Home/actions', () => {
  test('getAutoComplete', async () => {
    fetchMovies.mockResolvedValueOnce('test');
    await getAutoComplete()(dispatch);
    expect.assertions(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: LOADING, isLoading: true, key: 'AutoComplete' });
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: SUCCESS, data: undefined , key: 'AutoComplete' });

    fetchMovies.mockRejectedValueOnce({ message: 'gagal' });
    await getAutoComplete('test')(dispatch);
  });
});

