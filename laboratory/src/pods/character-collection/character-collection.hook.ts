import * as React from 'react';
import { CharacterEntityVm } from './character-collection.vm';
import { getLocalCharacterCollection, getPublicCharacterCollection } from './api';
import { mapFromApiToVm } from './character-collection.mapper';
import { mapToCollection } from '#common/mappers';

const LOCAL_CHARACTER_IDS = [1, 2, 3, 4, 5];

export const useCharacterCollection = () => {
  const [characterCollection, setCharacterCollection] = React.useState<CharacterEntityVm[]>(
    []
  );
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState(1);

  const loadCharacterCollection = async () => {

    if (page === 1) {
      const [localData, publicData] = await Promise.all([
        getLocalCharacterCollection(),
        getPublicCharacterCollection(1),
      ]);

      setTotalPages(publicData.info.pages);

      const publicWithoutLocal = publicData.results.filter(
        (character) => !LOCAL_CHARACTER_IDS.includes(character.id)
      );

      const combinedCharacters = [
        ...mapToCollection(localData.results, mapFromApiToVm),
        ...mapToCollection(publicWithoutLocal, mapFromApiToVm),
      ];

      setCharacterCollection(combinedCharacters);
    } else {
      const publicData = await getPublicCharacterCollection(page);

      setTotalPages(publicData.info.pages);

      setCharacterCollection(mapToCollection(publicData.results, mapFromApiToVm));
    }
  };

  const searchCharacters = async (query: string, page: number = 1): Promise<CharacterEntityVm[]> => {
    try {
      const [localChars, publicRes] = await Promise.all([
        getLocalCharacterCollection(),
        fetch(`https://rickandmortyapi.com/api/character/?name=${query}&page=${page}`).then(res => {
          if (!res.ok) throw new Error('Error fetching public API');
          return res.json();
        }),
      ]);

      setTotalPages(publicRes.info.pages);
      const publicResults = publicRes.results;

      const merged = publicResults.map((char: CharacterEntityVm) => {
        const local = localChars.results.find(localChar => Number(localChar.id) === Number(char.id));
        return local ?? char;
      });

      return merged;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return {
    characterCollection,
    loadCharacterCollection,
    setPage,
    page,
    totalPages,
    searchCharacters
  };
};
