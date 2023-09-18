// "use client";
// MUI Components
import {
    Container,
    Box,
    Divider,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";

// MUI Icons
import { FcHome } from "react-icons/fc";
import { BsPersonPlus } from "react-icons/bs";

// Nextjs
import Link from 'next/link'

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
];

export default function Importation() {
    return (
        <Container maxWidth="xl">
            <Box my={"1rem"}>
                <BreadcrumbsBK previousPaths={previousPaths} currentPath="Importação" />
            </Box>
            <Typography variant="h4" gutterBottom>
                Importar Autoridades
            </Typography>
            <Divider />
            <Grid container spacing={2}>
                <Grid item xs={2} sx={{ mt: '10px' }}>
                <Link href={"/admin/authority/importation/lcnaf"}>
                <Card sx={{ width: 180, cursor: 'pointer'}}>
                        <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Typography variant="body2" sx={{ textAlign: 'center'}}>
                                Library of Congress <br />
                                LCNAF
                            </Typography>
                            <Avatar
                                alt="lncaf"
                                src="/logos/lcnaf.png"
                                sx={{ width: 56, height: 56 }}
                            />
                        </CardContent>
                    </Card>
                </Link>
                    

                </Grid>


            </Grid>


        </Container>

    )
}