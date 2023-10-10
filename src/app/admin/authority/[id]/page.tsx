import {
  Container,
  Box,
  Typography,
  Button,
  Divider,
  Grid,
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";
import DeleteItem from "@/app/admin/authority/[id]/deleteItem";
import HasVariant from "@/components/solr/variant";
import IdentifiesRWO from "@/components/solr/identifiesRWO";
import FieldOfActivity from "@/components/solr/fieldOfActivity";
import ChildUri from "@/components/solr/childUri";
import HasAffiliation from "src/components/solr/hasAffiliation";

// React Icons
import { FcHome, FcCalendar } from "react-icons/fc";
import { CiEdit, CiImport } from "react-icons/ci";
import { BsFillPersonLinesFill, BsFillPersonPlusFill } from "react-icons/bs";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { GiTombstone } from "react-icons/gi"

// Nextjs
// import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// React Hooks
import { Suspense } from "react";

// import Loading from "@/app/admin/authority/[id]/loading";

const previousPaths = [
  {
    link: "/admin",
    label: "Início",
    icon: <FcHome fontSize="small" />,
  },
  {
    link: "/admin/authority",
    label: "Autoridades",
    icon: <BsFillPersonLinesFill fontSize="small" />,
  },
];

async function getData(id: string) {
  const url = `http://localhost:8983/solr/authority/select?fl=*,[child]&q=id:${id}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  const [doc] = data.response.docs;

  return (
    <Container maxWidth="xl">
      <Box my={"1rem"}>
        <BreadcrumbsBK previousPaths={previousPaths} currentPath={params.id} />
        <Suspense fallback={"Item em espera..."}>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h4" gutterBottom>
                {doc.label}
              </Typography>
              <Box>
              <Link href={"/admin/authority/importation"}>
                    <Button
                      variant="outlined"
                      sx={{ textTransform: "none", mr: "10px" }}
                      startIcon={<CiImport />}
                      // sx={{ lineHeight: 2.65, textTransform: "none" }}
                    >
                      Importar
                    </Button>
                  </Link>
                <Link href={"/admin/authority/create"}>
                  <Button
                    sx={{ textTransform: "none" }}
                    variant="outlined"
                    startIcon={<BsFillPersonPlusFill />}
                  >
                    Novo
                  </Button>
                </Link>
                <Link href={`/admin/authority/edit/${params.id}`}>
                  <Button
                    sx={{ textTransform: "none", mx: "10px" }}
                    variant="outlined"
                    startIcon={<CiEdit />}
                  >
                    Editar
                  </Button>
                </Link>
                <DeleteItem id={doc.id} type={doc.type} />
              </Box>
            </Box>
            <Divider />
            <Box sx={{ mt: "5px", display: "flex", gap: "15px" }}>
              {doc?.imagem && (
                <Image
                  src={doc?.imagem}
                  height={300}
                  width={200}
                  alt="Picture of the author"
                />
              )}
              <Grid
                container
                spacing={2}
                sx={{ alignItems: "flex-start", alignContent: "flex-start" }}
              >
                <Grid item xs={4}>
                  {doc?.fullerName && (
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold" }}
                      >
                        Nome completo:
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        {doc.fullerName}
                      </Typography>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={8}>
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-start", gap: "2rem" }}
                  >
                    {/* Nascimento */}
                    {(doc?.birthPlace || doc?.birthDate) && (
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold" }}
                        >
                          Nascimento:
                        </Typography>
                        <Box sx={{ display: "flex", gap: "5px" }}>
                          {doc?.birthPlace && (
                            <Button
                              startIcon={<LiaBirthdayCakeSolid />}
                              variant="outlined"
                              size="small"
                              sx={{ textTransform: "none" }}
                            >
                              {" "}
                              {doc.birthPlace}
                            </Button>

                          )}
                          {doc?.birthDate && <Button
                            variant="outlined"
                            startIcon={<FcCalendar />}
                            size="small"
                          >
                            {doc.birthDate}
                          </Button>}

                        </Box>
                      </Box>
                    )}
                    {/* Falecimento */}
                    {(doc?.deathPlace || doc?.deathDate) && (
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold" }}
                        >
                          Falecimento:
                        </Typography>

                        <Box sx={{ display: "flex", gap: "5px" }}>
                          {doc.deathPlace && (
                            <Button
                              startIcon={<GiTombstone />}
                              variant="outlined"
                              size="small"
                              sx={{ textTransform: "none" }}
                            >
                              {doc.deathPlace}
                            </Button>
                          )}

                          {doc?.deathDate && (
                            <Button
                              variant="outlined"
                              startIcon={<FcCalendar />}
                              size="small"
                            >
                              {" "}
                              {doc.deathDate}{" "}
                            </Button>
                          )}
                        </Box>
                      </Box>
                    )}
                  </Box>

                </Grid>

                {/* hasAffiliation */}
                {doc?.hasAffiliation && (
                  <Grid item xs={4}>
                    <HasAffiliation hasAffiliation={doc.hasAffiliation} />
                  </Grid>
                )}
                {/* variant */}
                {doc?.variant && (
                  <Grid item xs={4}>
                    <HasVariant hasVariant={doc.variant} />
                  </Grid>
                )}
                {/* occupation */}
                {doc?.occupation && (
                  <Grid item xs={4}>
                    <ChildUri
                      child={doc.occupation}
                      label={"Ocupações:"}
                    />
                  </Grid>
                )}
                {/* identifiesRWO */}
                {doc?.identifiesRWO && (
                  <Grid item xs={4}>
                    <IdentifiesRWO identifiesRWO={doc.identifiesRWO} />
                  </Grid>
                )}
                {/* FieldOfActivity */}
                {doc?.fieldOfActivity && (
                  <Grid item xs={4}>
                    <ChildUri
                      child={doc.fieldOfActivity}
                      label={"Campos de Atividade:"}
                    />

                    {/* <FieldOfActivity fieldOfActivity={doc.fieldOfActivity} /> */}
                  </Grid>
                )}
                {/* hasCloseExternalAuthority */}
                {doc?.hasCloseExternalAuthority && (
                  <Grid item xs={4}>
                    <ChildUri
                      child={doc.hasCloseExternalAuthority}
                      label={"Ocorrência em outros bases:"}
                    />
                  </Grid>
                )}
              </Grid>
            </Box>
          </Box>
        </Suspense>
      </Box>
    </Container>
  );
}
