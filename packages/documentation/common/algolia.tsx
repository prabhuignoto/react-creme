import { faAlgolia } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { algoliasearch } from 'algoliasearch';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
  useInstantSearch,
} from 'react-instantsearch';
import { AutoSuggestOption } from '../../lib/components/auto-suggest/auto-suggest.model';

const searchClient = algoliasearch(
  'XGNLLPC19C',
  'dfb0dd05a40e024acbd771f909a0ed4f'
);

// Custom hit component to display search results
const Hit = ({ hit, onSelection }) => {
  return (
    <div
      className="hit-item"
      onClick={() => onSelection({ name: hit.key, value: hit.path })}
    >
      <div className="hit-name">{hit.key}</div>
      <div className="hit-path">{hit.path}</div>
    </div>
  );
};

// Optional: Custom component to show empty results or error states
const EmptyQueryBoundary = ({ children }) => {
  const { results } = useInstantSearch();

  if (!results.__isArtificial && results.nbHits === 0) {
    return <div className="no-results">No results found</div>;
  }

  return children;
};

const AlgoliaSearch: React.FC<{
  onSelection: ({ name, value }: AutoSuggestOption) => void;
}> = ({ onSelection }) => {
  return (
    <InstantSearch searchClient={searchClient} indexName="react_creme_search">
      <div className="search-container">
        <SearchBox
          placeholder="Search with Algolia..."
          submitIconComponent={() => (
            <FontAwesomeIcon icon={faAlgolia} size="2x" />
          )}
          className="algolia-searchbox"
        />
        <Configure hitsPerPage={10} />
        <div className="hits-container">
          <EmptyQueryBoundary>
            <Hits
              hitComponent={({ hit }) => (
                <Hit hit={hit} onSelection={onSelection} />
              )}
            />
          </EmptyQueryBoundary>
        </div>
      </div>
    </InstantSearch>
  );
};

export default AlgoliaSearch;
