import { Typography } from "@mui/material";
import { FC } from "react";
import Form from "../../components/form";
import { NoteData } from "../../types";
import { addNote } from "../../redux/slices/notesSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../components/form/container";

const Create: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (data: NoteData) => {
    dispatch(addNote(data));
    navigate("/");
  };

  return (
    <PageContainer sx={{ paddingTop: "30PX" }} maxWidth="md">
      <Typography variant="h4" sx={{ marginBottom: "50px" }}>
        Yeni Not Oluştur
      </Typography>

      <Form handleSubmit={handleSubmit} />
    </PageContainer>
  );
};

export default Create;
