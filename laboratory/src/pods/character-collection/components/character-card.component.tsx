import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import { CharacterEntityVm } from '../character-collection.vm';
import * as classes from './character-card.styles';
import { Button } from '@mui/material';

interface Props {
  character: CharacterEntityVm;
  onSeeCharacter: (id: string) => void;
}

export const CharacterCard: React.FunctionComponent<Props> = (props) => {
  const { character, onSeeCharacter } = props;

  return (
    <Card>
      <CardHeader
        title={character.name}
        subheader={character.species}
      />
      <CardContent>
        <div className={classes.content}>
          <CardMedia
            image={character.picture}
            title={character.name}
            style={{ height: 0, paddingTop: '56.25%' }}
          />
        </div>
      </CardContent>
      { Number(character.id) < 6 ? (
        <CardActions>
          <Button size="small" onClick={() => onSeeCharacter(character.id)}>See More</Button>
        </CardActions>
      ) : null }
    </Card>
  );
};
