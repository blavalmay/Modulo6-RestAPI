import { Character } from './character.api-model';

const publicCharacterUrl = "https://rickandmortyapi.com/api/character";
const localCharacterUrl = "http://localhost:3000/api/character";

export const getCharacter = async (id: string): Promise<Character> => {
  const response = await fetch(`${Number(id) < 6 ? localCharacterUrl : publicCharacterUrl}/${id}`);
  if (response.ok) {
    return await response.json();
  } else {
    throw Error(response.statusText);
  }
};

export const updateCharacter = async (character: Character): Promise<boolean> => {
  if(character.id) {
    await fetch(`${localCharacterUrl}/${character.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(character),
    });
  } else {
    throw Error('No character to update');
  }
  return true;
}
