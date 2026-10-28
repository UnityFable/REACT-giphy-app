import type { FC } from 'react';

interface Props {
  prevSearches: string[];

  onLabelClick: (term: string) => void;
}

export const PreviousSearches: FC<Props> = ({ prevSearches, onLabelClick }: Props) => {
  return (
    <div className="previous-searches">
      <h2>Busquedas previas</h2>
      <ul className="previous-searches-list">
        {
          prevSearches.map(term => (
            <li key={term} onClick={() => onLabelClick(term)}>{term}</li>
          ))
        }
      </ul>
    </div>
  )
}
