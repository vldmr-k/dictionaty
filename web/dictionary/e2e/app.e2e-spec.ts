import { DictionaryPage } from './app.po';

describe('dictionary App', () => {
  let page: DictionaryPage;

  beforeEach(() => {
    page = new DictionaryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
