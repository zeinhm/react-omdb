import * as fetch from '../fetch';
import { get } from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('src/utils/fetch', () => {
  test('fetchMovies', async () => {
    get.mockResolvedValueOnce({ data: 'sukses' });
    const result = await fetch.fetchMovies('tes');
    expect(result).toBe('sukses');
  })

  test('fetchMovieDetail', async () => {
    get.mockResolvedValueOnce({ data: 'sukses' });
    const result = await fetch.fetchMovieDetail('tes');
    expect(result).toBe('sukses');
  })
})