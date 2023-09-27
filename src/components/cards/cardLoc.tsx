// MUI
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Tooltip,
  IconButton,
  Divider,
  Chip 
} from "@mui/material";

import { CiImport } from "react-icons/ci";
import { red } from "@mui/material/colors";

import { Authority } from "@/schema/authority";

interface Props {
  hit: Authority;
}

export default function CardLoc({ hit }: Props) {
  // const data = await getData(params.id);

  // const [doc] = data.response.docs;
  // console.log(doc)

  return (
    <Card variant="outlined">
      <CardContent>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {hit.authoritativeLabel[0]}
            </Avatar>
          }
          title={
            <>
            <Typography variant="h5" component="div">
              {hit.authoritativeLabel}
            </Typography>
            <Chip label="Small" size="small" />
            </>
            
          }
          action={
            <Tooltip title="Import registro">
              <IconButton
                aria-label="settings"
                onClick={() => {
                  // postImportBK(agent);
                }}
              >
                <CiImport />
              </IconButton>
            </Tooltip>
          }
        />
        <Divider />
      </CardContent>
    </Card>
  );
}
