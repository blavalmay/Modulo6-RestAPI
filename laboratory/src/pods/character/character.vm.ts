export interface Character {
  id: string;
  name: string;
  picture: string;
  status: string;
  gender: string;
  species: string;
  bestSentence?: string;
}

export const createEmptyCharacter = (): Character => ({
  id: '',
  name: '',
  picture: '',
  status: '',
  gender: '',
  species: '',
  bestSentence: '',
});
