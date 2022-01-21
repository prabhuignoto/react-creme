import { faAlgolia } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import algoliasearch from 'algoliasearch/lite';
import React, { useState } from 'react';
import { AutoSuggest } from '../../lib/components/auto-suggest/auto-suggest';
import { AutoSuggestOption } from '../../lib/components/auto-suggest/auto-suggest.model';

const searchClient = algoliasearch(
  'XGNLLPC19C',
  'dfb0dd05a40e024acbd771f909a0ed4f'
);

const index = searchClient.initIndex('react_creme_search');

const AutoSuggestUI: React.FC<{
  onSelection: ({ name, value }: AutoSuggestOption) => void;
}> = ({ onSelection }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (value: string) => {
    const fetchSuggestions = async () => {
      try {
        const results = await index.search(value, {
          hitsPerPage: 10,
        });
        setSuggestions(
          results.hits.map<AutoSuggestOption>((hit: any) => ({
            name: hit.key,
            value: hit.path,
          }))
        );
        setLoading(false);
      } catch (error) {
        console.warn(error);
      }
    };

    if (value) {
      fetchSuggestions();
      setLoading(true);
    }
  };

  return (
    <AutoSuggest
      suggestions={suggestions}
      suggestionsWidth={250}
      showSpinner={loading}
      placeholder="Search with Algolia..."
      onSelection={onSelection}
      onChange={handleChange}
      apiBacked
      icon={<FontAwesomeIcon icon={faAlgolia} size="2x" />}
    />
  );
};

export default AutoSuggestUI;
