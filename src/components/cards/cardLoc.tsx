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
  Chip,
  Grid,
  Box
} from "@mui/material";

import { CiImport } from "react-icons/ci";
import { red } from "@mui/material/colors";

import { schemaAuthority } from "@/schema/authority";

// BiblioKeia Hooks
import { useProgress } from "src/providers/progress";
import { useAlert } from "src/providers/alert";

// BiblioKeia Services
import { CreateAuthority } from "@/services/thesarus/createAuthority"

// BiblioKeia Components
import IdentifiesRWO from "@/components/madsrdf/identifiesRWO"
import FieldOfActivity from "@/components/madsrdf/fieldOfActivity"
import HasAffiliation from "src/components/madsrdf/hasAffiliation";
import HasVariant from "src/components/madsrdf/hasVariant";
import Occupation from "src/components/madsrdf/occupation";
import BtnIcon from "src/components/buttons/btnIcon";

// React Icons
import { FaTreeCity } from "react-icons/fa6";
import { FcCalendar } from "react-icons/fc";

// Nextjs
import { useRouter } from 'next/navigation'

interface Props {
  hit: schemaAuthority;
  setHit: Function
}

export default function CardLoc({ hit, setHit }: Props) {

  const router = useRouter();
  const { setProgress } = useProgress();
  const {
    setOpenSnack,
    setMessage,
    setTypeAlert,
  } = useAlert();

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
              <Chip label={hit.type} color="primary" size="small" />
            </>
          }
          action={
            <Tooltip title="Import registro">
              <IconButton
                aria-label="settings"
                onClick={() => {
                  CreateAuthority(
                    hit,
                    setProgress,
                    setTypeAlert,
                    setMessage,
                    setOpenSnack,
                    router
                  )
                }}
              >
                <CiImport />
              </IconButton>
            </Tooltip>
          }
        />
        <Divider />
        <Grid container spacing={2} sx={{ mt: "5px" }}>

          {/* Nascimento */}
          {(hit?.birthPlace || hit?.birthDate) && (
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
                  {hit?.birthPlace && (<BtnIcon icon={<FaTreeCity />} label={hit?.birthPlace} />)}
                  {hit?.birthDate && (<BtnIcon icon={<FcCalendar />} label={hit?.birthDate} />)}
                </Box>
              </Box>
            </Grid>
          )}

          {/* Falecimento */}
          {(hit?.deathPlace || hit?.deathDate) && (
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
                  {hit?.deathPlace && (<BtnIcon icon={<FaTreeCity />} label={hit.deathPlace} />)}
                  {hit?.birthDate && (<BtnIcon icon={<FcCalendar />} label={hit?.birthDate} />)}
                </Box>
              </Box>
            </Grid>
          )}

          {/* fullerName */}
          {hit?.fullerName && (
            <Grid item xs={6}>
              <Box sx={{ pl: "10px" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Nome completo:
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {hit.fullerName?.elementValue.value}
                </Typography>
              </Box>
            </Grid>
          )}

          {/* hasVariant */}
          { hit?.hasVariant && (
             <Grid item xs={6}>
             <HasVariant hasVariant={hit?.hasVariant} />
           </Grid>

          )}
          


          {/* identifiesRWO */}
          {
            hit?.identifiesRWO && (
              <Grid item xs={6}>
                <IdentifiesRWO identifiesRWO={hit?.identifiesRWO} />
              </Grid>
            )
          }
          {/* hasAffiliation */}
          {hit?.hasAffiliation && (
            <Grid item xs={6}>
              <Box sx={{ pl: "10px" }}>
                <HasAffiliation hasAffiliation={hit.hasAffiliation} />
              </Box>
            </Grid>
          )}

          {/* fieldOfActivity */}
          {hit?.fieldOfActivity && (
            <Grid item xs={6}>
              <FieldOfActivity fieldOfActivity={hit.fieldOfActivity} setHit={setHit} />
            </Grid>
          )}
          {/* Occupation */}
          {hit?.occupation && (
            <Grid item xs={6}>
              <Occupation occupation={hit.occupation} setHit={setHit} />
            </Grid>
          )}


        </Grid>
      </CardContent>
    </Card>
  );
}
