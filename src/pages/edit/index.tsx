import { FC } from "react";
import { Note, updateNote } from "../../redux/slices/notesSlice";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { PageContainer } from "../../components/form/container";
import { Typography } from "@mui/material";
import Form from "../../components/form";
import { NoteData } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

const Edit: FC = () => {
  const note = useOutletContext<Note>();
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const handleSubmit = (data: NoteData) => {
    if (!data.title || !data.tags || !data.markdown) return;

    dispatch(updateNote({ id: note.id, ...data }));

    navigate(`/note/${note.id}`);
  };
  return (
    <PageContainer sx={{ paddingTop: "30PX" }} maxWidth="md">
      <Typography variant="h4" sx={{ marginBottom: "50px" }}>
        Yeni Not Oluştur
      </Typography>

      <Form handleSubmit={handleSubmit} note={note} />
    </PageContainer>
  );
};

export default Edit;
