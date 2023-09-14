"use client"

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
  Typography,
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";
import { TreeView } from '@mui/x-tree-view/TreeView';
import StyledTreeItem from "@/components/baseMui/styledTreeItem"

// Reacts Icons
import { RiFilterLine } from 'react-icons/ri';
import { BsArrowsAngleContract, BsArrowsAngleExpand } from 'react-icons/bs';

// React Icons
import { FcHome, FcCalendar } from "react-icons/fc";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { GiTombstone } from "react-icons/gi";



import Image from "next/image";

// BiblioKeia Services
import { solr } from "@/services/solr";
import { gridColumnLookupSelector } from "@mui/x-data-grid";

// React Hooks
import { useEffect, useState } from "react";



const previousPaths = [
  {
    link: "/admin",
    label: "Início",
    icon: <FcHome fontSize="small" />,
  },
  {
    link: "/admin/Authority",
    label: "Autoridades",
    icon: <FcHome fontSize="small" />,
  },
];

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    console.log("params", params.id)
    solr.get(`authority/select?fl=*,[child]&q=id:${params.id}`)
      .then(function (response) {
        const [doc] = response.data.response.docs
        setData(doc)
        // console.log(doc)
      })
      .catch(function (error) {
        // manipula erros da requisição
        console.error(error);
      })
      .finally(function () {
        // sempre será executado
        setLoading(false)
      });

  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>


  return (
    <Container maxWidth="xl">
      <Box my={"1rem"}>
        <BreadcrumbsBK previousPaths={previousPaths} currentPath={params.id} />
        <Typography variant="h4" gutterBottom>
          {data.authority}
        </Typography>
        <Divider />
        <Box sx={{ mt: "5px", display: "flex", gap: "15px" }}>

          <Image
            src={data?.imagem[0]}
            // fill={true}
            height={300}
            width={200}
            alt="Picture of the author"
          />

          <Grid container spacing={2} sx={{ alignItems: "flex-start", alignContent: "flex-start" }}>
            <Grid item xs={12} //sx={{border: "solid"}}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Nome completo:
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {data.fullerName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Nascimento:
                  </Typography>
                  <Box sx={{ display: "flex", gap: "5px" }}>
                    <Button startIcon={<LiaBirthdayCakeSolid />} variant="outlined" size="small" sx={{ textTransform: "none" }}> {data.birthPlace} </Button>
                    <Button variant="outlined" startIcon={<FcCalendar />} size="small"> {data.birthDate} </Button>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Morte:
                  </Typography>
                  <Box sx={{ display: "flex", gap: "5px" }}>
                    {data?.deathPlace &&
                      <Button startIcon={<GiTombstone />} variant="outlined" size="small" sx={{ textTransform: "none" }}> {data.deathPlace} </Button>}
                    <Button variant="outlined" startIcon={<FcCalendar />} size="small"> {data.deathDate} </Button>
                  </Box>
                </Box>
              </Box>

            </Grid>
            {/* <Grid item xs={4}>
              <TreeView
                defaultCollapseIcon={<BsArrowsAngleExpand />}
                defaultExpandIcon={<BsArrowsAngleContract />}
                defaultExpanded={["1"]}
                sx={{
                  flexGrow: 1, overflowY: 'auto'
                }}
              >
                <StyledTreeItem nodeId="1" labelText={<Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Afiliação:
                </Typography>} >
                  <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {
                      data?.hasAffiliation?.map((nome, index) => (
                        <StyledTreeItem
                          key={index}
                          nodeId={`${index + 2}`}
                          labelText={nome}
                          // labelInfo={facet.count}
                          color="#a250f5"
                          bgColor="#f3e8fd"
                          colorForDarkMode="#D9B8FB"
                          bgColorForDarkMode="#100719" />
                      ))
                    }
                  </Box>
                </StyledTreeItem>

              </TreeView>
            </Grid> */}
            <Grid item xs={4}>
              <TreeView
                defaultCollapseIcon={<BsArrowsAngleExpand />}
                defaultExpandIcon={<BsArrowsAngleContract />}
                defaultExpanded={["1"]}
                sx={{
                  flexGrow: 1, overflowY: 'auto'
                }}
              >
                <StyledTreeItem nodeId="1" labelText={<Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Variantes do nome:
                </Typography>} >
                  <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {
                      data?.variant?.map((nome, index) => (
                        <StyledTreeItem
                          key={index}
                          nodeId={`${index + 2}`}
                          labelText={nome}
                          // labelInfo={facet.count}
                          color="#a250f5"
                          bgColor="#f3e8fd"
                          colorForDarkMode="#D9B8FB"
                          bgColorForDarkMode="#100719" />
                      ))
                    }
                  </Box>
                </StyledTreeItem>

              </TreeView>
            </Grid>
            <Grid item xs={4}>
              <TreeView
                defaultCollapseIcon={<BsArrowsAngleExpand />}
                defaultExpandIcon={<BsArrowsAngleContract />}
                defaultExpanded={["1"]}
                sx={{
                  flexGrow: 1, overflowY: 'auto'
                }}
              >
                <StyledTreeItem nodeId="1" labelText={<Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Ocupações:
                </Typography>} >
                  <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {
                      data?.occupation?.map((nome, index) => (
                        <StyledTreeItem
                          key={index}
                          nodeId={`${index + 2}`}
                          labelText={nome}
                          // labelInfo={facet.count}
                          color="#a250f5"
                          bgColor="#f3e8fd"
                          colorForDarkMode="#D9B8FB"
                          bgColorForDarkMode="#100719" />
                      ))
                    }
                  </Box>
                </StyledTreeItem>

              </TreeView>
            </Grid>

          </Grid>
          <Divider />

        </Box>

      </Box>
    </Container>
  );
}
