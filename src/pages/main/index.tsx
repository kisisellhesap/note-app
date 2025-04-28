import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Button, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { PageContainer } from "../../components/form/container";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import NoteCard from "./NoteCard";

const Main: FC = () => {
  const { notes } = useSelector((store: RootState) => store.notes);
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(title.toLowerCase()) &&
      selectedTags.every((sTag) => note.tags.includes(sTag))
  );
  return (
    <PageContainer>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap={1}>
          <img src="/logo.png" width={50} />
          <Typography variant="h4">Notlar</Typography>
        </Stack>

        <Button variant="contained" color="info">
          <Link to="/new">Oluştur</Link>
        </Button>
      </Stack>

      <Filter setTitle={setTitle} setSelectedTags={setSelectedTags} />

      <Grid container spacing={2} marginTop={10}>
        {filteredNotes.map((note, i) => {
          return (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <NoteCard note={note} />
            </Grid>
          );
        })}
      </Grid>
    </PageContainer>
  );
};

export default Main;
