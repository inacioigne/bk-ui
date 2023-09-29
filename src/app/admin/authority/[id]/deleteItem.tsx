
import {
    Container,
    Box,
    Typography,
    Button
} from "@mui/material";

import { BsFillPersonLinesFill, BsFillPersonPlusFill, BsFillPersonXFill } from "react-icons/bs";

export default function DeleteItem() {
    return (
        <>
        <Button sx={{ textTransform: 'none' }} 
              variant="outlined" startIcon={<BsFillPersonXFill />} 
              //onClick={() => { setOpen(true) }}
              >Excluir</Button>
        </>
        
    )
}