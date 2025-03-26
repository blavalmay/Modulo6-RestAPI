import React from 'react';
import { Character } from './character.vm';
import { Button, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { switchRoutes } from '#core/router';
import { useNavigate } from 'react-router-dom';

interface Props {
  character: Character;
}

export const CharacterComponent: React.FunctionComponent<Props> = (props) => {
  const { character } = props;
  const navigate = useNavigate();

  return (
    <>
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
              Status: {character.status}
            </Typography>
            <Typography variant="subtitle1">
              Gender: {character.gender}
            </Typography>
          </div>
        </CardContent>
      </Card>
      <Button
        size="small"
        style={{ marginTop: '2rem' }}
        onClick={() => navigate(switchRoutes.root)} >
          Characters list
      </Button>
    </>
  );
};
