import * as React from 'react';
import { CharacterEntityVm } from './character-collection.vm';
import { CharacterCard } from './components/character-card.component';
import * as classes from './character-collection.styles';

interface Props {
  characterCollection: CharacterEntityVm[];
  characterCollectionMock: CharacterEntityVm[];
  onSeeCharacter: (id: string) => void;
}

export const CharacterCollectionComponent: React.FunctionComponent<Props> = (
  props
) => {
  const { characterCollection, characterCollectionMock, onSeeCharacter } = props;

  return (
    <div className={classes.root}>
      <ul className={classes.list}>
        {characterCollection.map((character) => (
          <li key={character.id}>
          <CharacterCard
            character={
              parseInt(character.id) <= characterCollectionMock.length
                ? characterCollectionMock[parseInt(character.id) - 1]
                : character
            }
            onSeeCharacter={onSeeCharacter}
          />
        </li>
        ))}
      </ul>
    </div>
  );
};
