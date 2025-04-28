import { FormEvent, useState } from "react";
import { Button, Grid2 as Grid, Stack, TextField } from "@mui/material";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addTag } from "../../redux/slices/tagsSlice";
import TagSelect from "./TagSelect";
import { NoteData } from "../../types";
import { Link } from "react-router-dom";
import { Note } from "../../redux/slices/notesSlice";

interface Props {
  note?: Note;
  handleSubmit: (data: NoteData) => void;
}
const Form = ({ note, handleSubmit }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState<string>(note?.title || "");
  const [markdown, setMarkdown] = useState<string>(note?.markdown || "");
  const [selectedTags, setSelectedTags] = useState<string[]>(note?.tags || []);

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !markdown || selectedTags.length < 1) {
      alert("Formu doldurun ve en az 1 etiket seçin");
      return;
    }

    handleSubmit({ title, markdown, tags: selectedTags });
    console.log(title, markdown);
    console.log(selectedTags);

    setTitle("");
    setMarkdown("");
  };

  const handleAddTag = (newTag: string) => {
    if (newTag.trim() === "") return;
    if (newTag.trim().length > 6) return;

    if (selectedTags.length === 5) return;

    if (selectedTags.includes(newTag)) return;

    dispatch(addTag(newTag));

    setSelectedTags([...selectedTags, newTag]);
  };

  const handleDeleteTag = (value: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== value));
  };
  return (
    <form onSubmit={handleForm}>
      <Grid container sx={{ marginTop: "50px" }} spacing={5}>
        <Grid size={6}>
          <TextField
            label="Başlık"
            variant="outlined"
            color="primary"
            focused
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </Grid>
        <Grid size={6}>
          <TagSelect
            handleAddTag={handleAddTag}
            selectedTags={selectedTags}
            handleDeleteTag={handleDeleteTag}
          />
        </Grid>
      </Grid>

      <Stack gap={2} sx={{ marginTop: "100px" }}>
        <TextField
          fullWidth
          multiline
          minRows={15}
          maxRows={100}
          onChange={(e) => setMarkdown(e.target.value)}
          value={markdown}
          variant="outlined"
          label=" İçerik (markdown destekler)"
          color="primary"
          focused
        />
      </Stack>

      <Stack direction="row" justifyContent="end" spacing={5} marginTop={5}>
        <Button
          variant="contained"
          color="secondary"
          sx={{ minWidth: "100px" }}
          type="button"
        >
          <Link to="..">Geri</Link>
        </Button>
        <Button type="submit" variant="contained" sx={{ minWidth: "100px" }}>
          Kaydet
        </Button>
      </Stack>
    </form>
  );
};

export default Form;
