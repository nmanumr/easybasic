import { EasybasicWebPage } from './app.po';

describe('easybasic-web App', () => {
  let page: EasybasicWebPage;

  beforeEach(() => {
    page = new EasybasicWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
