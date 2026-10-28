import { useEffect, useState, type KeyboardEvent } from 'react';

interface Props {
  placeHolder: string;

  onQuery: (query: string) => void;
}

export const SearchBar = ({ placeHolder = 'Buscar', onQuery }: Props) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onQuery(query);
    }, 700);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, onQuery]);

  const handleSearch = () => {
    onQuery(query);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        name="search"
        id="search"
        placeholder={placeHolder}
        value={query}
        onChange={event => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  )
}
