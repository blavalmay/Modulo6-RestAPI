import { CharacterEntityApi } from './character-collection.api-model';

const publicCharactersUrl = "https://rickandmortyapi.com/api/character";
const localCharactersUrl = "http://localhost:3000/api/character";

export const getLocalCharacterCollection = async (): Promise<CharacterEntityApi> => {
  const response = await fetch(localCharactersUrl);
  if (response.ok) {
    return await response.json();
  } else {
    throw Error(response.statusText);
  }
};

export const getPublicCharacterCollection = async (page: number): Promise<CharacterEntityApi> => {
  const response = await fetch(`${publicCharactersUrl}?page=${page}`);
  if (response.ok) {
    return await response.json();
  } else {
    throw Error(response.statusText);
  }
};
