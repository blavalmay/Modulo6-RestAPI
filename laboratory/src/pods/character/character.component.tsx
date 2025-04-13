import React from 'react';
import { Character } from './character.vm';
import { Button, Card, CardContent, CardHeader, CardMedia, Container, IconButton, Stack, Typography } from '@mui/material';
import { switchRoutes } from '#core/router';
import { useNavigate } from 'react-router-dom';
import { TextFieldComponent } from '#common/components';
import { Form, Formik } from 'formik';
import * as classes from './character.styles';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  character: Character;
  editField: boolean;
  setEditField: (bool: boolean) => void;
  onUpdate: (bestSentence: Character) => void;
}

export const CharacterComponent: React.FunctionComponent<Props> = (props) => {
  const { character, onUpdate, editField, setEditField } = props;
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" disableGutters>
      <Card>
        <CardHeader
          title={character.name}
          subheader={character.species} />
        <CardContent>
          <div>
            <CardMedia
              image={character.picture}
              title={character.name}
              style={{ height: 0, paddingTop: '56.25%', marginBottom: '1rem' }} />
            <Typography variant="subtitle1">
              <strong>Status:</strong> {character.status}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Gender:</strong> {character.gender}
            </Typography>
          </div>
          <Formik onSubmit={onUpdate} initialValues={character} enableReinitialize>
            <Stack direction="row" sx={{ alignItems: "center", flexWrap: 'wrap', gap: 1 }}>
              <Typography variant="subtitle1" className={classes.title}>
                <strong>Best sentence:</strong>
              </Typography>
              {editField ? (
              <Form className={classes.form}>
                <TextFieldComponent name="bestSentence" label="Best sentence" size='small' style={{ margin: 0 }} />
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Form>
              ) : (
                <>
                <Typography variant="subtitle1" className={classes.title}>
                  {character.bestSentence}
                </Typography>
                {character.bestSentence && character.bestSentence !== '' ? (
                  <IconButton aria-label="edit" color="primary" onClick={() => setEditField(true)}>
                    <EditIcon />
                  </IconButton>
                ) : (
                  <Button variant="outlined" size='small' onClick={() => setEditField(true)}>
                    Add
                  </Button>
                )}
                </>
              )}
            </Stack>
          </Formik>
        </CardContent>
      </Card>
      <Button
        size="small"
        style={{ marginTop: '2rem' }}
        onClick={() => navigate(switchRoutes.root)} >
          Characters list
      </Button>
    </Container>
  );
};
