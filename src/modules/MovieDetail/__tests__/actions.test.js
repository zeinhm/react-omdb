import { getMovieDetail } from '../actions';
import { fetchMovieDetail } from '../../../utils/fetch';
import { LOADING, SUCCESS } from '../constants';


jest.mock('../../../utils/fetch', () => ({
  fetchMovieDetail: jest.fn(),
}));
jest.fn().mockResolvedValue({ data: 'test' });
const dispatch = jest.fn();

describe('src/pages/Home/actions', () => {
  test('getMovieDetail', async () => {
    fetchMovieDetail.mockResolvedValueOnce('test');
    await getMovieDetail('test')(dispatch);
    expect.assertions(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: LOADING, isLoading: true, key: 'MovieDetail' });
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: SUCCESS, data: 'test' , key: 'MovieDetail' });

    fetchMovieDetail.mockRejectedValueOnce({ message: 'gagal' });
    await getMovieDetail('test')(dispatch);
  });
});

