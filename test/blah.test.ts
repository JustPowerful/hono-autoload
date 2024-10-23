import { createAutoloader, createAutoloaderMiddleware } from '..';

describe('route-autoloader', () => {
  it('works', () => {
    expect(createAutoloader).toBeDefined();
    expect(createAutoloader).toBeInstanceOf(Function);
  });
});

describe('middleware-autoloader', () => {
  it('works', () => {
    expect(createAutoloaderMiddleware).toBeDefined();
    expect(createAutoloaderMiddleware).toBeInstanceOf(Function);
  });
});
