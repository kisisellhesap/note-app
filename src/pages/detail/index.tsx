import { FC } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { deleteNote, Note } from "../../redux/slices/notesSlice";
import { PageContainer } from "../../components/form/container";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
const Detail: FC = () => {
  const note = useOutletContext<Note>();

  const dispatch = useDispatch<AppDispatch>();
  console.log(note);

  const handleDelete = () => {
    if (!confirm("Silmek istediğinize emin misiniz ?")) return;

    dispatch(deleteNote(note.id));
  };
  return (
    <PageContainer>
      <Stack direction="row" gap={2} justifyContent="space-between">
        <div>
          <Typography variant="h2">{note.title}</Typography>
          <Stack direction="row" gap={1} flexWrap="wrap" marginTop={2}>
            {note.tags.map((tag, i) => {
              return <Chip label={tag} key={i} />;
            })}
          </Stack>
        </div>

        <Stack direction="row" gap={2} alignItems="center">
          <Button component={Link} to="..">
            Geri
          </Button>
          <Button variant="contained" color="info" component={Link} to="edit">
            Düzenle
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Sil
          </Button>
        </Stack>
      </Stack>

      <Box marginY={4}>
        <ReactMarkdown>{note.markdown}</ReactMarkdown>
      </Box>
    </PageContainer>
  );
};

export default Detail;
