// MUI
import {
    Typography,
    Tooltip,
    IconButton,
    Divider,
    Chip,
    Grid,
    Box,
    Avatar,
    Button
} from "@mui/material";

import BtnIcon from "src/components/buttons/btnIcon";

import { logos } from "@/share/objLogos"

import { LocAuthority } from "@/services/importation/locAuthority"

interface ElementMads {
    label: string
    base?: string
    uri?: string
    type?: string
}

interface Props {
    authority: ElementMads
    setHit: Function
}

export default function HasBroaderAuthority({ authority, setHit }: Props) {
    // let loc = logos['loc']
    // console.log(loc)

    return (
        <Box sx={{ pl: "10px"}}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                Termo Geral:
            </Typography>
            <Button
                variant="outlined"
                startIcon={<Tooltip title={authority.base}>
                    <Avatar sx={{ width: 24, height: 24, bgcolor: "red" }}>
                        <Box sx={{ fontSize: "13px" }}>
                            LC
                        </Box>
                    </Avatar>

                </Tooltip>
                }
                size="small"
                sx={{ textTransform: "none" }}
                onClick={() => {
                    LocAuthority(setHit, authority.uri)
                    // console.log(authority)
                  }}
            >
                {authority.label}
            </Button>
        </Box>
    )
}