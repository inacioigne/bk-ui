"use client";
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
  ListItemIcon,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';

// React Hooks
import { useState, FormEvent, ChangeEvent, ReactNode } from "react";

// BiblioKeia Services
import { SearchLCSH } from "@/services/searchLCSH";
import { GetDataLoc } from "@/services/getDataLoc";
import { LocAuthority } from "@/services/importation/locAuthority"

import { bkapi } from "src/services/api";

// react-icons
import { FcHome, FcSearch } from "react-icons/fc";
import { BsPersonCircle } from "react-icons/bs";
import { MdOutlineSubject, MdChildCare } from "react-icons/md";



interface typeHits {
  aLabel: string;
  uri: string;
}

const iconType = {
  names: <BsPersonCircle className="icone-personalizado" />,
  subjects: <MdOutlineSubject className="icone-personalizado" />,
  childrensSubjects: <MdChildCare className="icone-personalizado"/>

}

interface Props {
  setHit: Function;
}


export default function FormLCSH( props: Props) {

  const { setHit } = props

  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
  const [hits, setHits] = useState<typeHits[]>([]);
  const [params, setParams] = useState(new URLSearchParams());
  params.set("rdftype", "SimpleType");

  const handleChangeType = (event: SelectChangeEvent, params: URLSearchParams) => {
    const target = event.target as HTMLButtonElement;
    setType(target.value);
    if (target.value === 'all') {
      params.has('rdftype') && params.delete('rdftype')
      params.set("rdftype", "SimpleType");

    } else {
      params.set("rdftype", target.value);
    }
    search !== "" && SearchLCSH(params, setHits);
  };

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLButtonElement;
    params.set("q", target.value);
    setSearch(target.value)
    SearchLCSH(params, setHits);
  };

  return (
    <>
      <form>
        <Paper sx={{ p: "1rem" }}>
          <FormControl fullWidth sx={{ mb: "0.5rem" }}>
            <InputLabel id="label">Selecione uma opção</InputLabel>
            <Select
              labelId="label"
              id="demo-simple-select"
              value={type}
              label="Selecione uma opção"
              onChange={(e) => {
                handleChangeType(e, params);
              }}
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="Topic">Termo Topico</MenuItem>
              <MenuItem value="Geographic">Termo Geográfico</MenuItem>
              <MenuItem value="PersonalName">Nome Pessoal</MenuItem>
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
      {
        search && (
          <Paper elevation={3} sx={{ mb: "10px" }}>
            {hits.length > 0 ? (
              <div>
                <List>
                  {hits.map((hit, index) => (
                    <ListItem disablePadding key={index}>
                      <ListItemButton
                      onClick={(e) => {
                        // GetDataLoc(setHit, hit.uri)
                        LocAuthority(setHit, hit.uri)

                      }}
                      >
                        <ListItemIcon color="primary">
                        {iconType[`${hit.uri.split('/')[4]}`]} 
                          {/* {hit.uri.split('/')[4] === ''}
                          <BsPersonCircle /> */}
                        </ListItemIcon>
                        <ListItemText
                          primary={hit.aLabel}
                          secondary={hit.uri}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>

              </div>
            ) : (
              <Typography variant="subtitle2" sx={{ p: "5px" }}>
                Nenhum resultado encontrado
              </Typography>
            )}
          </Paper>
        )
      }
    </>
  );
}
