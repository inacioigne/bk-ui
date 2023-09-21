"use client"
import {
  Container,
  Box,
  Grid,
  Skeleton,
  DialogActions,
  DialogContentText,
  DialogContent,
  Dialog,
  ButtonGroup,
  Divider,
  Button,
  Typography,
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import StyledTreeItem from "@/components/baseMui/styledTreeItem"
import  ExternalAuthority  from "@/components/madsrdf/view/externalAuthority";

// Reacts Icons
import { BsArrowsAngleContract, BsArrowsAngleExpand } from 'react-icons/bs';

// React Icons
import { FcHome, FcCalendar } from "react-icons/fc";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { CiEdit } from "react-icons/ci";
import { BsFillPersonPlusFill, BsFillPersonXFill } from "react-icons/bs";

import Image from "next/image";

// BiblioKeia Services
import { solr } from "@/services/solr";
import { bkapi } from "@/services/api";

// React Hooks
import { useEffect, useState } from "react";

// Providers BiblioKeia
import { useProgress } from "src/providers/progress";
import { useAlert } from "@/providers/alert"

// Nextjs
import { useRouter, usePathname, useSearchParams  } from 'next/navigation'
import Link from 'next/link'


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

import { PersonalNameDoc } from "@/schema/authority/solr"

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter() 
  const [doc, setDoc] = useState<PersonalNameDoc|null>(null)
  const [open, setOpen] = useState(false);
  const { progress, setProgress } = useProgress();
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const {
    openSnack, 
    setOpenSnack, 
    message,
    setMessage,
    typeAlert,
    setTypeAlert,
  } = useAlert()

  // setProgress(true)

  const handleClose = () => {
    setOpen(false);
    // setOpenSnack(true)
  };

  const handleDelete = () => {

    setOpen(false);
    setProgress(true)

    const data = {
      "id": doc?.id,
      "type": doc?.type[0]
    }

    const headers = {
      'Content-Type': 'application/json',
    };

    bkapi.delete("authority/", { data, headers })
      .then(function (response) {
        console.log(response)
        if (response.status === 200) {
          setMessage("Registro excluido com sucesso!")
          router.push(`/admin/authority/`)
        }
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(function () {
        setProgress(false)
        setOpenSnack(true)
        setDoc(null)
      });

  }

  useEffect(() => { 

    solr.get(`authority/select?fl=*,[child]&q=id:${params.id}`)
      .then(function (response) {
        const [doc] = response.data.response.docs
        setDoc(doc)
        // console.log(response.data.response.docs)
      })
      .catch(function (error) {
        // manipula erros da requisição
        console.error(error);
      })
      .finally(function () {
        setProgress(false)
      });

  }, [])

  if (progress) return (
    <Container maxWidth="xl">
       <Box my={"1rem"}>
       <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
       </Box>
    </Container>
  )

  if (!doc) return <p>No profile data</p>


  return (
    <>
      <Container maxWidth="xl">
        <Box my={"1rem"}>
          <BreadcrumbsBK previousPaths={previousPaths} currentPath={params.id} />
          <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
            <Typography variant="h4" gutterBottom>
              {doc.authority}
            </Typography>
            <Box>
              <Link href={'/admin/authority/create'}>
              <Button sx={{ textTransform: 'none' }} variant="outlined" startIcon={<BsFillPersonPlusFill />}>Novo</Button>
              </Link>
              
              <Button sx={{ textTransform: 'none', mx: '10px' }} variant="outlined" startIcon={<CiEdit />}>Editar</Button>
              <Button sx={{ textTransform: 'none' }} variant="outlined" startIcon={<BsFillPersonXFill />} onClick={() => { setOpen(true) }}>Excluir</Button>
            </Box>

          </Box>
          <Divider />
          <Box sx={{ mt: "5px", display: "flex", gap: "15px" }}>
            {doc?.imagem && (
              <Image
                src={doc?.imagem[0]}
                height={300}
                width={200}
                alt="Picture of the author"
              />
            )}

            <Grid container spacing={2} sx={{ alignItems: "flex-start", alignContent: "flex-start" }}>
              <Grid item xs={12} >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  {doc?.fullerName && (
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                        Nome completo:
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        {doc.fullerName}
                      </Typography>
                    </Box>
                  )}
                  {/* Nascimento */}
                  {(doc?.birthPlace || doc?.birthDate) && (
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                        Nascimento:
                      </Typography>
                      <Box sx={{ display: "flex", gap: "5px" }}>
                        <Button startIcon={<LiaBirthdayCakeSolid />} variant="outlined" size="small" sx={{ textTransform: "none" }}> {doc.birthPlace}</Button>
                        <Button variant="outlined" startIcon={<FcCalendar />} size="small"> {doc.birthDate} </Button>
                      </Box>
                    </Box>
                  )}
                  {(doc?.deathPlace || doc?.deathDate) && (
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                        Falecimento:
                      </Typography>
                      <Box sx={{ display: "flex", gap: "5px" }}>
                      <Button startIcon={<LiaBirthdayCakeSolid />} variant="outlined" size="small" sx={{ textTransform: "none" }}> {doc.deathPlace}</Button>
                      {doc?.deathDate && <Button variant="outlined" startIcon={<FcCalendar />} size="small"> {doc.deathDate} </Button>}
                      </Box>
                    </Box>

                  )}
                </Box>

              </Grid>
              {doc?.hasAffiliation && (
                <Grid item xs={4}>
                  <TreeView
                    defaultCollapseIcon={<BsArrowsAngleExpand />}
                    defaultExpandIcon={<BsArrowsAngleContract />}
                    defaultExpanded={["1"]}
                    sx={{
                      flexGrow: 1, overflowY: 'auto'
                    }}
                  >
                    <StyledTreeItem nodeId="1" labelText="Afiliação" >
                      {(typeof doc.hasAffiliation === 'object') ? (
                        <StyledTreeItem
                          nodeId="2"
                          labelText={doc.hasAffiliation.organization}
                          color="#a250f5"
                          bgColor="#f3e8fd"
                          colorForDarkMode="#D9B8FB"
                          bgColorForDarkMode="#100719" >

                          <Box sx={{ display: "flex", mt: "5px" }}>
                            <TreeItem nodeId="3" label={
                              <ButtonGroup variant="outlined" size="small" aria-label="small button group" >
                                <Button sx={{ textTransform: 'none' }}>Início:</Button>
                                <Button variant="outlined" startIcon={<FcCalendar />} size="small"> {doc.hasAffiliation.affiliationStart} </Button>
                              </ButtonGroup>
                            } />
                            <TreeItem nodeId="3" label={
                              <ButtonGroup variant="outlined" size="small" aria-label="small button group" >
                                <Button sx={{ textTransform: 'none' }}>Fim:</Button>
                                <Button variant="outlined" startIcon={<FcCalendar />} size="small"> {doc.hasAffiliation.affiliationEnd} </Button>
                              </ButtonGroup>
                            } />
                          </Box>
                        </StyledTreeItem>
                      ) : (<code>ARRAY</code>)}
                    </StyledTreeItem>
                  </TreeView>
                </Grid>

              )}
              {doc?.variant && (
                <Grid item xs={4}>
                  <TreeView
                    defaultCollapseIcon={<BsArrowsAngleExpand />}
                    defaultExpandIcon={<BsArrowsAngleContract />}
                    defaultExpanded={["1"]}
                    sx={{
                      flexGrow: 1, overflowY: 'auto'
                    }}
                  >
                    <StyledTreeItem nodeId="1" labelText="Variantes do nome:">
                      <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        {
                          doc?.variant?.map((nome, index) => (
                            <StyledTreeItem
                              key={index}
                              nodeId={`${index + 2}`}
                              labelText={nome}
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
              )}
              {doc?.occupation && (
                <Grid item xs={4}>
                  <TreeView
                    defaultCollapseIcon={<BsArrowsAngleExpand />}
                    defaultExpandIcon={<BsArrowsAngleContract />}
                    defaultExpanded={["1"]}
                    sx={{
                      flexGrow: 1, overflowY: 'auto'
                    }}
                  >
                    <StyledTreeItem nodeId="1" labelText="Ocupações:" >
                      <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        {
                          doc?.occupation?.map((nome, index) => (
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

              )}

              {doc?.hasExactExternalAuthority && (
                <Grid item xs={4}>
                <ExternalAuthority externalAuthority={doc?.hasExactExternalAuthority} />
                </Grid>
              )}


            </Grid>
          </Box>
          <Divider sx={{ mt: '10px' }} />
          <Typography variant="h6" gutterBottom>
            Obras desse autor:
          </Typography>
        </Box>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você tem certeza que deseja excluir esse registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDelete} autoFocus>
            Sim
          </Button>
        </DialogActions>

      </Dialog>

    </>

  );
}
