import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface Props {
  selectedTags: string[];
  handleAddTag: (newTag: string) => void;
  handleDeleteTag: (value: string) => void;
}

const TagSelect = ({ selectedTags, handleAddTag, handleDeleteTag }: Props) => {
  const [newTag, setNewTag] = useState<string>("");

  const { tags } = useSelector((store: RootState) => store.tags);

  return (
    <>
      <Stack direction="row" gap={2}>
        <Autocomplete
          options={tags.filter((t) => !selectedTags.includes(t))}
          freeSolo
          clearOnBlur
          color="primary"
          fullWidth
          value={newTag}
          onChange={(e, tag) => handleAddTag(tag as string)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Etiketler"
              onChange={(e) => {
                setNewTag(e.target.value);
              }}
            />
          )}
        />
        <Button
          variant="contained"
          onClick={() => {
            handleAddTag(newTag);
            setNewTag("");
          }}
        >
          +
        </Button>
      </Stack>

      <Box
        position="absolute"
        display="flex"
        flexWrap="wrap"
        gap={1}
        marginTop={2}
      >
        {selectedTags.map((tag, i) => {
          return (
            <Chip
              label={tag}
              key={i}
              onDelete={() => handleDeleteTag(tag)}
              color={tag === newTag ? "primary" : "default"}
            />
          );
        })}
      </Box>
    </>
  );
};

export default TagSelect;
