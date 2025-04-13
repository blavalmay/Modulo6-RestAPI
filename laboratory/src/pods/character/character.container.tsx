import React from 'react';
import { useParams } from 'react-router-dom';
import * as api from './api';
import { createEmptyCharacter, Character } from './character.vm';
import { mapCharacterFromApiToVm, mapCharacterFromVmToApi } from './character.mappers';
import { CharacterComponent } from './character.component';
import { Alert, Snackbar } from '@mui/material';

export const CharacterContainer: React.FunctionComponent = () => {
  const [character, setCharacter] = React.useState<Character>(createEmptyCharacter());
  const [editField, setEditField] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });
  const { id } = useParams<{ id: string }>();

  const handleLoadCharacter = async () => {
    const apiCharacter = await api.getCharacter(id);
    setCharacter(mapCharacterFromApiToVm(apiCharacter));
  };

  React.useEffect(() => {
    if (id) {
      handleLoadCharacter();
    }
  }, []);

  const handleUpdate = async (updatedCharacter: Character) => {
    const updated = { ...character, bestSentence: updatedCharacter.bestSentence };
    setCharacter(updated); // opcional: solo para mantener sincronizado el estado local

    const success = await api.updateCharacter(mapCharacterFromVmToApi(updated));

    if(success) {
      setEditField(false);
      setAlert({open: true, message: 'Saved!', severity: 'success'});
    } else {
      setAlert({open: true, message: 'Error saving character', severity: 'error'});
    }
  }

  return (
    <>
      <CharacterComponent character={character} onUpdate={handleUpdate} editField={editField} setEditField={setEditField} />
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};
