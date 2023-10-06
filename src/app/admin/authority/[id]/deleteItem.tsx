"use client";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
// React Hooks
import { useState } from "react";

import {
  BsFillPersonLinesFill,
  BsFillPersonPlusFill,
  BsFillPersonXFill,
} from "react-icons/bs";

// Providers BiblioKeia
import { useProgress } from "src/providers/progress";
import { useAlert } from "@/providers/alert";

import { bkapi } from "@/services/api";

// Nextjs
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// Schema
import { schemaAuthorityDoc } from "@/schema/solr";

interface Props {
  id: string;
  type: string;
}

export default function DeleteItem({ id, type }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { progress, setProgress } = useProgress();
  const {
    openSnack,
    setOpenSnack,
    message,
    setMessage,
    typeAlert,
    setTypeAlert,
  } = useAlert();

  const handleClose = () => {
    setOpen(false);
    // setOpenSnack(true)
  };

  const handleDelete = () => {
    setOpen(false);
    setProgress(true);

    const data = {
      id: id,
      type: type,
    };
    

    const headers = {
      "Content-Type": "application/json",
    };
    // console.log(data)

    bkapi
      .delete("/thesarus/delete", { data, headers })
      .then(function (response) {
        // console.log(response);
        if (response.status === 200) {
          setMessage("Registro excluido com sucesso!");
          router.push(`/admin/authority/`);
        }
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(function () {
        setProgress(false);
        setOpenSnack(true);
        // setDoc(null);
      });
  };

  return (
    <>
      <Button
        sx={{ textTransform: "none" }}
        variant="outlined"
        startIcon={<BsFillPersonXFill />}
        onClick={() => {
          setOpen(true);
        }}
      >
        Excluir
      </Button>
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
