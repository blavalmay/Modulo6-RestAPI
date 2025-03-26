import * as apiModel from './api/character-collection.api-model';
import * as viewModel from './character-collection.vm';

export const mapFromApiToVm = (
  character: apiModel.CharacterEntityApiResults
): viewModel.CharacterEntityVm => ({
  id: character.id.toString(),
  name: character.name,
  picture: character.image,
  species: character.species,
});
