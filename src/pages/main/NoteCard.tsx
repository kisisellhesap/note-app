import { Link } from "react-router-dom";
import { Note } from "../../redux/slices/notesSlice";
import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  note: Note;
}

const NoteCard = ({ note }: Props) => {
  return (
    <Card variant="elevation">
      <CardActionArea component={Link} to={`/note/${note.id}`}>
        <CardContent>
          <Typography variant="h5" textAlign="center">
            {note.title}
          </Typography>

          <Stack
            direction="row"
            justifyContent="center"
            gap={1}
            flexWrap="wrap"
            marginTop={2}
          >
            {note.tags.map((tag, i) => (
              <Chip label={tag} key={i} />
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NoteCard;
