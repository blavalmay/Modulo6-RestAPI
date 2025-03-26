export interface CharacterEntityApi {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  }
  results: CharacterEntityApiResults[];
}

export interface CharacterEntityApiResults {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
