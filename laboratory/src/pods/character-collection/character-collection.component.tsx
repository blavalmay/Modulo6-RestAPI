import * as React from 'react';
import { CharacterEntityVm } from './character-collection.vm';
import { CharacterCard } from './components/character-card.component';
import * as classes from './character-collection.styles';
import { Dispatch, SetStateAction } from 'react';
import { Pagination } from '@mui/material';

interface Props {
  characterCollection: CharacterEntityVm[];
  onSeeCharacter: (id: string) => void;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}

export const CharacterCollectionComponent: React.FunctionComponent<Props> = (
  props
) => {
  const { characterCollection, onSeeCharacter, currentPage, setCurrentPage, totalPages } = props;

  return (
    <div className={classes.root}>
      <ul className={classes.list}>
        {characterCollection.map((character) => (
          <li key={character.id}>
          <CharacterCard
            character={character}
            onSeeCharacter={onSeeCharacter}
          />
        </li>
        ))}
      </ul>
      <Pagination
        className={classes.pagination}
        count={totalPages}
        page={currentPage}
        onChange={(_, value) => setCurrentPage(value)}
      />
    </div>
  );
};
