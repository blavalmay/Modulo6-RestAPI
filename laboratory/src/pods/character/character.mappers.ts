import * as apiModel from './api/character.api-model';
import * as viewModel from './character.vm';

export const mapCharacterFromApiToVm = (
  character: apiModel.Character
): viewModel.Character => ({
  ...character,
  id: character.id.toString(),
  name: character.name,
  picture: character.image,
  status: character.status,
  gender: character.gender,
  species: character.species,
});

export const mapCharacterFromVmToApi = (character: viewModel.Character): apiModel.Character =>
  (({
    ...character,
    id: character.id,
    name: character.name,
    image: character.picture,
    status: character.status,
    gender: character.gender,
    species: character.species,
  } as unknown) as apiModel.Character);
