import loadUser from '../src/js/user';
import { httpGet } from '../src/js/http';

jest.mock('../src/js/http');

beforeEach(() => {
  jest.resetAllMocks();
});

test('should call loadUser once', () => {
  httpGet.mockReturnValue(JSON.stringify({}));

  loadUser(1);
  expect(httpGet).toBeCalledWith('http://server:8080/users/1');
});
