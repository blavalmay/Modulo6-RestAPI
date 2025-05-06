import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { linkRoutes } from '#core/router';
import { useCharacterCollection } from './character-collection.hook';
import { CharacterCollectionComponent } from './character-collection.component';
import { Button, IconButton, Pagination, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { CharacterEntityVm } from './character-collection.vm';

export const CharacterCollectionContainer = () => {
  const {
    characterCollection,
    loadCharacterCollection,
    page,
    setPage,
    totalPages,
    searchCharacters
  } = useCharacterCollection();
  const navigate = useNavigate();
  const [query, setQuery] = React.useState('');
  const [characters, setCharacters] = React.useState<CharacterEntityVm[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchPage, setSearchPage] = React.useState(1);

  React.useEffect(() => {
    if (!isSearching) {
      loadCharacterCollection();
    }
  }, [page, isSearching]);

  React.useEffect(() => {
    if (!isSearching) {
      setCharacters(characterCollection);
    }
  }, [characterCollection, isSearching]);

  React.useEffect(() => {
    if (isSearching) {
      handleSearchCharacter(searchPage);
    }
  }, [searchPage]);

  const handleSeeCharacter = (id: string) => {
    navigate(linkRoutes.characterDetails(id));
  };

  const handleResetSearch = () => {
    setIsSearching(false);
    setPage(1);
    setQuery('');
  }

  const handleSearchCharacter = async (pageToSearch = 1) => {
    if (query.trim() === '') {
      handleResetSearch();
      return;
    }

    setIsSearching(true);
    setSearchPage(pageToSearch);

    const results = await searchCharacters(query, pageToSearch);
    setCharacters(results);
  };

  return (
    <Stack spacing={3}>
      <Stack
        spacing={1}
        direction="row"
        sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Stack direction="row">
            <TextField
              label="Search Character"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearchCharacter();
              }}
              placeholder="Rick"
            />
            <IconButton onClick={() => handleSearchCharacter()}><SearchIcon /></IconButton>
          </Stack>
          { isSearching ? (
            <Button variant="contained" onClick={handleResetSearch}>Reset search</Button>
          ) : null }
      </Stack>
      <CharacterCollectionComponent
        characterCollection={characters}
        onSeeCharacter={handleSeeCharacter}
      />
      <Pagination
        sx={{ alignSelf: 'flex-end' }}
        count={totalPages}
        page={isSearching ? searchPage : page}
        onChange={(_, value) => {
          if (isSearching) {
            setSearchPage(value);
          } else {
            setPage(value);
          }
        }}
      />
    </Stack>
  );
};
