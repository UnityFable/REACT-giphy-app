import { useRef, useState } from 'react';
import type { Gif } from '../interfaces/gif.interface';
import { getGifsByQuery } from '../actions/get-gifs-by-query.action';

// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleTermClick = async (term: string) => {
    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term]);
      return;
    }

    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
  };

  const handleSearch = async (query: string = '') => {
    const queryTerm = query.trim().toLocaleLowerCase();

    if (queryTerm.length === 0) return;

    if (previousTerms.includes(queryTerm)) return;

    setPreviousTerms([queryTerm, ...previousTerms.slice(0, 7)]);

    const gifs = await getGifsByQuery(query);
    setGifs(gifs);

    gifsCache.current[queryTerm] = gifs;
  };

  return {
    gifs,
    previousTerms,
    handleTermClick,
    handleSearch,
  }
}
