"use client";
// MUI Components
import {
  Container,
  Box,
  Divider,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';

// react-icons
import { FcHome, FcSearch } from "react-icons/fc";
import { BsPersonPlus, BsPersonFillDown } from "react-icons/bs";


// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";
import CardLCNAF from "src/components/cards/cardLCNAF";

// BiblioKeia Services
import { SearchLCNAF } from "@/services/searchLCNAF";
import { bkapi } from "src/services/api";

// React Hooks
import { useState, FormEvent, ChangeEvent } from "react";

// Providers BiblioKeia
import { useProgress } from "src/providers/progress";
import { useAlert } from "src/providers/alert";


const previousPaths = [
  {
    link: "/admin",
    label: "Início",
    icon: <FcHome fontSize="small" />,
  },
  {
    link: "/admin/authority",
    label: "Autoridades",
    icon: <BsPersonPlus fontSize="small" />,
  },
  {
    link: "/admin/authority/importation",
    label: "Importação",
    icon: <BsPersonFillDown fontSize="small" />,
  },
];

export default function Lcnaf() {
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [hits, setHits] = useState([]);
  const [agent, setAgent] = useState(null);
  const [params, setParams] = useState(new URLSearchParams());
  const { setProgress } = useProgress();
  const {
    openSnack,
    setOpenSnack,
    message, 
    setMessage,
    typeAlert,
    setTypeAlert,
  } = useAlert();

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLButtonElement;
    params.set("q", target.value);
    setSearch(target.value)
    SearchLCNAF(params, setHits);
  };

  const handleChangeType = (event: SelectChangeEvent, params: URLSearchParams) => {
    const target = event.target as HTMLButtonElement;
    params.set("rdftype", target.value);
    setType(target.value);
    SearchLCNAF(params, setHits);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append("q", search);
    SearchLCNAF(params, setHits);
  };

  const getImportBK = (uri: string) => {
    setProgress(true);
    bkapi
      .get(`/import/loc/agents?uri=${uri}`)
      .then((response) => {
        setAgent(response.data);
        console.log(response.data);
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
    <Container maxWidth="xl">
      <Box my={"1rem"}>
        <BreadcrumbsBK previousPaths={previousPaths} currentPath="LNCAF" />
      </Box>
      <Typography variant="h4" gutterBottom>
        Importar Autoridades - LNCAF
      </Typography>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={5} sx={{ mt: "15px" }}>
          <form onSubmit={onSubmit}>
            <Paper sx={{ p: "1rem"}}>
                <FormControl fullWidth sx={{mb: "0.5rem"}} >
                  <InputLabel id="label">
                    Selecione uma opção
                  </InputLabel>
                  <Select
                    labelId="label"
                    id="demo-simple-select"
                    value={type}
                    label="Selecione uma opção"
                    onChange={(e) => {handleChangeType(e, params)}}
                  >
                    <MenuItem value="all">Todos</MenuItem>
                    <MenuItem value="PersonalName">Nome Pessoal</MenuItem>
                    <MenuItem value="CorporateName">Nome Corporativo</MenuItem>
                    <MenuItem value="Title">Título</MenuItem>
                    <MenuItem value="CorporateName">Nome Geográfico</MenuItem>
                    <MenuItem value="Conference">Evento</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Busca"
                  variant="outlined"
                  value={search}
                  fullWidth
                  onChange={handleChangeSearch}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          color="primary"
                          aria-label="Search"
                          type="submit"
                        >
                          <FcSearch />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
            </Paper>
          </form>
          <nav aria-label="secondary mailbox folders">
            {search && (
              <Paper elevation={3} sx={{ mb: "10px" }}>
                {loading ? (
                  <LinearProgress />
                ) : (
                  <div>
                    {hits.length > 0 ? (
                      <div>
                        <List>
                          {hits.map((hit, index) => (
                            <ListItem disablePadding key={index}>
                              <ListItemButton
                                onClick={(e) => {
                                  getImportBK(hit.uri);
                                  // console.log(hit.uri);
                                }}
                              >
                                <ListItemText
                                  primary={hit.aLabel}
                                  secondary={hit.uri}
                                />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                        {/* <Box
                          sx={{
                            p: "15px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Pagination
                            color="primary"
                            //   disabled={true}
                            page={currentPage}
                            count={totalPages}
                            onChange={handlePageChange}
                            renderItem={(item) => (
                              <PaginationItem component="div" {...item} />
                            )}
                          />
                        </Box> */}
                      </div>
                    ) : (
                      <Typography variant="subtitle2" sx={{ p: "5px" }}>
                        Nenhum resultado encontrado
                      </Typography>
                    )}
                  </div>
                )}
              </Paper>
            )}
          </nav>
        </Grid>
        <Grid item xs={7} sx={{ mt: "15px" }}>
          {agent && <CardLCNAF agent={agent} />}
        </Grid>
        </Grid>
    </Container>
  );
}
