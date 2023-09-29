
import {
    Container,
    Box,
    Typography,
    Button,
    Divider,
    Grid
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";
import DeleteItem from "@/app/admin/authority/[id]/deleteItem"
import Occupation from "@/components/solr/ccupation"

// React Icons
import { FcHome, FcCalendar } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { BsFillPersonLinesFill, BsFillPersonPlusFill, BsFillPersonXFill } from "react-icons/bs";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

// Nextjs
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from "next/image";

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
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {

        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
    const data = await getData(params.id);
    const [doc] = data.response.docs;
    console.log(doc.hasOccupation)

    return (
        <Container maxWidth="xl">
            <Box my={"1rem"}>
                <BreadcrumbsBK
                    previousPaths={previousPaths}
                    currentPath={params.id}
                />
                <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                    <Typography variant="h4" gutterBottom>
                        {doc.authority}
                    </Typography>
                    <Box>
                        <Link href={'/admin/authority/create'}>
                            <Button sx={{ textTransform: 'none' }} variant="outlined" startIcon={<BsFillPersonPlusFill />}>Novo</Button>
                        </Link>
                        <Link href={`/admin/authority/edit/${params.id}`}>
                            <Button sx={{ textTransform: 'none', mx: '10px' }} variant="outlined" startIcon={<CiEdit />}>Editar</Button>
                        </Link>
                        <DeleteItem />
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
                        {/* hasAffiliation */}
                        { doc?.hasAffiliation && (
                            <Grid item xs={4}>
                                hasAffiliation
                            </Grid>
                        )}
                        {/* variant */}
                        { doc?.variant && (
                            <Grid item xs={4}>variant</Grid>
                        )}
                        {/* occupation */}
                        { doc?.occupation && (
                            <Grid item xs={4}>
                                <Occupation occupation={doc.hasOccupation} />
                            </Grid>
                        ) }
                    </Grid>


                </Box>
            </Box>

        </Container>
    )
}