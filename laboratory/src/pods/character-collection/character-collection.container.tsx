import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { linkRoutes } from '#core/router';
import { useCharacterCollection } from './character-collection.hook';
import { CharacterCollectionComponent } from './character-collection.component';

export const CharacterCollectionContainer = () => {
  const { characterCollection, characterCollectionMock, loadCharacterCollection } = useCharacterCollection();
  const navigate = useNavigate();

  React.useEffect(() => {
    loadCharacterCollection();
  }, []);

  const handleSeeCharacter = (id: string) => {
    navigate(linkRoutes.characterDetails(id));
  };

  return (
    <CharacterCollectionComponent
      characterCollection={characterCollection}
      characterCollectionMock={characterCollectionMock}
      onSeeCharacter={handleSeeCharacter}
    />
  );
};
