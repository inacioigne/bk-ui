"use client";
import {
  Container,
  Box,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Divider,
  Button,
  Typography
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";

// React Icons
import { FcHome, FcSearch } from "react-icons/fc";
import { TbUserSearch } from "react-icons/tb";
import { MdSubject } from "react-icons/md";
import { AiOutlineClear } from "react-icons/ai";
import { BsPersonPlus } from "react-icons/bs";
import { CiImport } from "react-icons/ci";

// React Hooks
import { useState, useEffect, FormEvent } from "react";

// BiblioKeia Services
import { SearchNames } from "@/services/searchNames";

// BiblioKeia Components
import { TabName } from "src/components/tables/tabNames";
import FacetTypeNames from "src/components/facets/typeNames";
import Affiliation from "src/components/facets/affiliations";
import Occupations from "src/components/facets/occupations";

// Providers BiblioKeia
import { useParmasAutority } from "src/providers/paramsAuthority"

const previousPaths = [
  {
    link: "/admin",
    label: "Início",
    icon: <FcHome fontSize="small" />,
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}


export default function Authority() {

  const { paramsAuthority } = useParmasAutority()

  const [value, setValue] = useState(0);

  const [rowCount, setRowCount] = useState("*");
  const [field, setField] = useState("search_general");
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);
  const [facetType, setFacetType] = useState([]);
  const [facetAffiliation, setFacetAffiliation] = useState([]);
  const [facetOccupation, setOccupation] = useState([]);


  useEffect(() => {
    paramsAuthority.set('rows', "3")
    SearchNames(paramsAuthority, setRows, setRowCount, setFacetType, setFacetAffiliation, setOccupation);
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeField = (event: SelectChangeEvent) => {
    setField(event.target.value as string);
    // getData(search, event.target.value, currentPage);
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value as string);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    paramsAuthority.set('q', `${field}:${search}`)
    paramsAuthority.has('start') && paramsAuthority.delete('start')
    SearchNames(paramsAuthority, setRows, setRowCount, setFacetType, setFacetAffiliation, setOccupation);
    console.log(paramsAuthority.has('start'))
  };

  const handleClean = () => {
    paramsAuthority.set('q', "search_general:*")
    paramsAuthority.delete('fq')
    paramsAuthority.has('start') && paramsAuthority.delete('start')
    setSearch("")
    setField("search_general")
    SearchNames(paramsAuthority, setRows, setRowCount, setFacetType, setFacetAffiliation, setOccupation);

  };

  return (
    <Container maxWidth="xl">
      <Box my={"1rem"}>
        <BreadcrumbsBK
          previousPaths={previousPaths}
          currentPath="Autoridades"
        />
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={
                <Box sx={{ textTransform: "none" }}>
                  {" "}
                  <TbUserSearch /> Autores
                </Box>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <Box sx={{ textTransform: "none" }}>
                  {" "}
                  <MdSubject /> Assuntos
                </Box>
              }
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Paper elevation={3} sx={{ p: "15px" }}>
            <form onSubmit={onSubmit}>
              <Grid container spacing={2}>
               
                <Grid item xs={2}>
                  <FormControl fullWidth>
                    <InputLabel id="field-label">Filtro</InputLabel>
                    <Select
                      labelId="field-label"
                      id="field-select"
                      value={field}
                      label="Filtro"
                      onChange={handleChangeField}
                    >
                      <MenuItem value="search_general">Todos</MenuItem>
                      <MenuItem value="authority">Nome Autorizado</MenuItem>
                      <MenuItem value="fullerName">Nome completo</MenuItem>
                      <MenuItem value="variant">Variantes</MenuItem>
                      <MenuItem value="organization">Afiliação</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
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
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Button variant="outlined" size="large"
                    startIcon={<AiOutlineClear />}
                    sx={{ lineHeight: 2.65, textTransform: 'none' }}
                    onClick={handleClean}
                  >
                    Limpar
                  </Button>
                  <Button variant="outlined" size="large" startIcon={<BsPersonPlus />} sx={{ lineHeight: 2.65, textTransform: 'none' }}
                  >
                    Novo
                  </Button>
                  <Button variant="outlined" size="large" startIcon={<CiImport />} sx={{ lineHeight: 2.65, textTransform: 'none' }}
                  >
                    Importar
                  </Button>

                </Grid>

              </Grid>
            </form>
            <Divider sx={{ mt: "10px" }} />

            <Box sx={{ mt: "10px" }}>

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {facetType?.length > 0 && (
                      <FacetTypeNames
                        facets={facetType}
                        setRows={setRows}
                        setRowCount={setRowCount}
                        setFacetType={setFacetType}
                        setFacetAffiliation={setFacetAffiliation}
                        setOccupation={setOccupation}
                      />
                    )}
                    {facetAffiliation?.length > 0 && (
                      <Affiliation
                        facets={facetAffiliation}
                        setRows={setRows}
                        setRowCount={setRowCount}
                        setFacetType={setFacetType}
                        setFacetAffiliation={setFacetAffiliation}
                        setOccupation={setOccupation}
                      />
                    )}
                    {facetOccupation?.length > 0 && (
                      <Occupations facets={facetOccupation}
                        setRows={setRows}
                        setRowCount={setRowCount}
                        setFacetType={setFacetType}
                        setFacetAffiliation={setFacetAffiliation}
                        setOccupation={setOccupation}
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  {rows.length > 0 ? <TabName
                    rows={rows} rowCount={rowCount}
                    setRowCount={setRowCount}
                    setRows={setRows}
                    setFacetType={setFacetType}
                    setFacetAffiliation={setFacetAffiliation}
                    setOccupation={setOccupation} /> : (
                    <Box>
                      <Typography variant="body1" gutterBottom>
                        Sua busca não retornou nenhum resultado
                      </Typography>
                    </Box>
                  )
                  }
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </CustomTabPanel>
      </Box>
    </Container>
  );
}
