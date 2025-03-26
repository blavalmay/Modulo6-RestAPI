import { Character } from './character.api-model';

const characterUrl = "https://rickandmortyapi.com/api/character";

export const getCharacter = async (id: string): Promise<Character> => {
  const response = await fetch(`${characterUrl}/${id}`);
  if (response.ok) {
    return await response.json();
  } else {
    throw Error(response.statusText);
  }
};
