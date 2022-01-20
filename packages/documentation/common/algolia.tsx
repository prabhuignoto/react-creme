import algoliasearch from 'algoliasearch/lite';
import React, { useState } from 'react';
import { AutoComplete } from '../../lib/components/auto-complete/auto-complete';
import { AutoCompleteOption } from '../../lib/components/auto-complete/auto-complete.model';

const searchClient = algoliasearch(
  'XGNLLPC19C',
  'dfb0dd05a40e024acbd771f909a0ed4f'
);

const index = searchClient.initIndex('react_creme_search');

const AutoCompleteUI: React.FC<{
  onSelection: ({ name, value }: AutoCompleteOption) => void;
}> = ({ onSelection }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (value: string) => {
    const fetchSuggestions = async () => {
      try {
        const results = await index.search(value, {
          hitsPerPage: 50,
        });
        setSuggestions(
          results.hits.map<AutoCompleteOption>((hit: any) => ({
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
    <AutoComplete
      suggestions={suggestions}
      suggestionsWidth={250}
      showSpinner={loading}
      placeholder="Search..."
      onSelection={onSelection}
      onChange={handleChange}
      noFiltering
      accent="rounded"
    />
  );
};

export default AutoCompleteUI;
