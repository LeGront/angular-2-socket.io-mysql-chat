import { U4chatPage } from './app.po';

describe('u4chat App', function() {
  let page: U4chatPage;

  beforeEach(() => {
    page = new U4chatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
