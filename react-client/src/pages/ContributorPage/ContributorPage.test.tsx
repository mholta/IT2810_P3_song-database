import { TestProvider } from '../../utils/test-utils';
import renderer from 'react-test-renderer';
import ContributorPage from './ContributorPage';

test('rendered successfully', () => {
  const tree = renderer
    .create(
      <TestProvider url="/">
        <ContributorPage />
      </TestProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
