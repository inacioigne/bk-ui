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
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';

// React Hooks
import { useState, FormEvent, ChangeEvent } from "react";

// BiblioKeia Services
import { SearchLCSH } from "@/services/searchLCSH";
import { bkapi } from "src/services/api";

// react-icons
import { FcHome, FcSearch } from "react-icons/fc";

export default function FormLCSH() {
    const [type, setType] = useState("all");
    const [search, setSearch] = useState("");
    const [hits, setHits] = useState([]);
    const [params, setParams] = useState(new URLSearchParams());

    const handleChangeType = (event: SelectChangeEvent, params: URLSearchParams) => {
        const target = event.target as HTMLButtonElement;
        params.set("rdftype", target.value);
        setType(target.value);
        SearchLCSH(params, setHits);
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
                                // onClick={(e) => {
                                //   getImportBK(hit.uri);
                                //   // console.log(hit.uri);
                                // }}
                              >
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
