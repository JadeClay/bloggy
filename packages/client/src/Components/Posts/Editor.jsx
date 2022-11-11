import React from "react";
import MDEditor from '@uiw/react-md-editor';
import { Stack } from "@mui/system";

// TO DO: Create all bussiness logic to create the post. Add a CREATE button and a Title field.

export default function Editor() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <Stack sx={{width: "100%"}}>

        <div data-color-mode="dark" style={{ width: '90%'  }}>
            <MDEditor
                value={value}
                onChange={setValue}
                visibleDragbar={false}
            />
        </div>
    </Stack>
  );
}