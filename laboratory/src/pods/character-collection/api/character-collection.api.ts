import { CharacterEntityApi } from './character-collection.api-model';

// const characterUrl = "https://rickandmortyapi.com/api/character";
const characterUrl = "http://localhost:3000/api/character";

export const getCharacterCollection = async (): Promise<CharacterEntityApi> => {
  const response = await fetch(characterUrl);
  if (response.ok) {
    return await response.json();
  } else {
    throw Error(response.statusText);
  }
};
