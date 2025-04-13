import { Character } from './character.api-model';

// const characterUrl = "https://rickandmortyapi.com/api/character";
const characterUrl = "http://localhost:3000/api/character";

export const getCharacter = async (id: string): Promise<Character> => {
  const response = await fetch(`${characterUrl}/${id}`);
  if (response.ok) {
    return await response.json();
  } else {
    throw Error(response.statusText);
  }
};

export const updateCharacter = async (character: Character): Promise<boolean> => {
  if(character.id) {
    await fetch(`${characterUrl}/${character.id}`, {
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
