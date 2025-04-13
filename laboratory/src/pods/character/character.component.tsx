import React from 'react';
import { Character } from './character.vm';
import { Button, Card, CardContent, CardHeader, CardMedia, Container, Stack, Typography } from '@mui/material';
import { switchRoutes } from '#core/router';
import { useNavigate } from 'react-router-dom';
import { TextFieldComponent } from '#common/components';
import { Form, Formik } from 'formik';
import * as classes from './character.styles';

interface Props {
  character: Character;
}

export const CharacterComponent: React.FunctionComponent<Props> = (props) => {
  const { character } = props;
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
          <Formik onSubmit={() => {}} initialValues={{ bestSentence: '' }}>
            <Stack direction="row" sx={{ alignItems: "center", flexWrap: 'wrap', gap: 1 }}>
              <Typography variant="subtitle1" className={classes.title}>
                <strong>Best sentence:</strong>
              </Typography>
              <Form className={classes.form}>
                <TextFieldComponent name="bestSentence" label="Best sentence" size='small' style={{ margin: 0 }} />
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Form>
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
