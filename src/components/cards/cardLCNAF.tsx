"use client";
// MUI Components
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  Box,
  CardHeader,
  Avatar,
  Tooltip,
  Divider,
  Grid,
} from "@mui/material";
// import TreeView from "@mui/lab/TreeView";
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem} from '@mui/x-tree-view/TreeItem';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import TreeItem from "@mui/lab/TreeItem";

import { ImportExport } from "@mui/icons-material/";
import { red } from "@mui/material/colors";

// BiblioKeia Services
import { bkapi } from "src/services/api";

// React Icons
import { FaTreeCity } from "react-icons/fa6";
import { FcCalendar } from "react-icons/fc";

// BiblioKeia Components
import BtnIcon from "src/components/buttons/btnIcon";
// import CardAffiliation from "src/components/cards/cardAffiliation";
import HasCloseExternalAuthority from "src/components/madsrdf/view/hasCloseExternalAuthority";
import HasVariant from "src/components/madsrdf/view/hasVariant";
import FieldOfActivity from "src/components/madsrdf/view/fieldOfActivity";
import HasAffiliation from "src/components/madsrdf/view/hasAffiliation";


// BiblioKeia Hooks
import { useProgress } from "src/providers/progress";
import { useAlert } from "src/providers/alert";

import { useRouter } from 'next/navigation'
import { convertToObject } from "typescript";

export default function CardLCNAF({ agent }) {
  const router = useRouter()
  const { setProgress } = useProgress();
  const {
    setOpenSnack,
    setMessage,
    setTypeAlert,
  } = useAlert();

  const postImportBK = (agent) => {

    setProgress(true);
    bkapi
      .post(`/authorities/agents/`, agent)
      .then((response) => {
        setTypeAlert("success");
        setMessage("Registro importado com sucesso");
        setOpenSnack(true);
        router.replace(`/admin/authority?id=${response.data.id}`)
      })
      .catch(function (error) {
        if (error.response.status == 409) {
          setTypeAlert("error");
          setMessage(error.response.data.detail);
          setOpenSnack(true);
        } else {
          console.log("ERROOO!!", error);
        }
      })
      .finally(function () {
        setProgress(false);
      });
  };
  return (
    <Card variant="outlined">
      <CardContent>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {agent.authoritativeLabel[0]}
            </Avatar>
          }
          title={
            <Typography variant="h5" component="div">
              {agent.authoritativeLabel}
            </Typography>
          }
          action={
            <Tooltip title="Import registro">
              <IconButton
                aria-label="settings"
                onClick={() => {
                  postImportBK(agent);
                }}
              >
                <ImportExport />
              </IconButton>
            </Tooltip>
          }
        />
        <Divider />
        <Grid container spacing={2} sx={{ mt: "5px" }}>
          {/* fullerName */}
          {agent?.fullerName && (
            <Grid item xs={12}>
              <Box sx={{ pl: "10px" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Nome completo:
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {agent.fullerName?.elementValue.value}
                </Typography>
              </Box>
            </Grid>
          )}

          {/* Nascimento */}
          {(agent?.birthPlace || agent?.birthDate) && (
            <Grid item xs={6}>
              <Box sx={{ pl: "10px" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Nascimento:
                </Typography>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "5px",
                    p: "5px",
                  }}
                >
                  {agent?.birthPlace && (
                    <BtnIcon icon={<FaTreeCity />} label={agent.birthPlace} />
                  )}
                  {agent?.birthDate && (
                    <BtnIcon icon={<FcCalendar />} label={agent.birthDate} />
                  )}
                </Box>
              </Box>
            </Grid>
          )}

          {/* Falecimento */}
          {(agent?.deathPlace || agent?.deathDate) && (
            <Grid item xs={6}>
              <Box sx={{ pl: "10px" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Falecimento:
                </Typography>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "5px",
                    p: "5px",
                  }}
                >
                  {agent?.deathPlace && (
                    <BtnIcon icon={<FaTreeCity />} label={agent.deathPlace} />
                  )}
                  {agent?.deathDate && (
                    <BtnIcon icon={<FcCalendar />} label={agent.deathDate} />
                  )}
                </Box>
              </Box>
            </Grid>
          )}

          {/* hasVariant */}
          {agent?.hasVariant && (
            <Grid item xs={6}>
              <HasVariant hasVariant={agent?.hasVariant} />
            </Grid>
          )}

          {/* hasAffiliation */}
          {agent?.hasAffiliation && (
            <Grid item xs={6}>
              <Box sx={{ pl: "10px" }}>
              <HasAffiliation hasAffiliation={agent.hasAffiliation} />
              
              </Box>
            </Grid>
          )}

          {/* occupation */}
          {agent?.occupation && (
            <Grid item xs={6}>
              <Box sx={{ pl: "10px" }}>
                <TreeView
                  aria-label="file system navigator"
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  sx={{
                    flexGrow: 1,
                    maxWidth: 400,
                    overflowY: "auto",
                  }}
                >
                  <TreeItem
                    nodeId="1"
                    label={
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold" }}
                      >
                        Ocupações:
                      </Typography>
                    }
                  >
                    {agent.occupation.map((occupation, index) => (
                      <TreeItem
                        key={index}
                        nodeId={"2"}
                        label={occupation.label}
                      />
                    ))}
                  </TreeItem>
                </TreeView>
              </Box>
            </Grid>
          )}

          {/* fieldOfActivity */}
          {agent?.fieldOfActivity && (
            <Grid item xs={6}>
              <FieldOfActivity fieldOfActivity={agent.fieldOfActivity} />
            </Grid>
          )}

          {/* hasCloseExternalAuthority */}
          {agent?.hasCloseExternalAuthority && (
            <Grid item xs={6}>
              <HasCloseExternalAuthority
                hasCloseExternalAuthority={agent.hasCloseExternalAuthority}
              />
            </Grid>
          )}

          {/* hasExactExternalAuthority */}
          {agent?.hasExactExternalAuthority && (
            <Grid item xs={6}>
              TESTE
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}