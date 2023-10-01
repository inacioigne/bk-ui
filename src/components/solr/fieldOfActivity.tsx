"use client"
// MUI Components
import { Typography, Box } from "@mui/material";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import {
  TreeItem,
} from "@mui/x-tree-view/TreeItem";
// import { BsLink45Deg } from "react-icons/bs";

import { schemaUri } from "@/schema/authority";

import StyledTreeItem from "@/components/baseMui/styledTreeItem";

// Bibliokeia Services
// import { LocAuthority } from "@/services/importation/locAuthority";
// BiblioKeia Components
import { logos } from "@/share/objLogos"

// Nextjs
import Link from "next/link";

type Props = {
    fieldOfActivity: schemaUri[];
};

export default function FieldOfActivity({ fieldOfActivity }: Props) {
  return (
      <TreeView
        aria-label="FieldOfActivity"
        defaultCollapseIcon={<AiOutlineArrowDown />}
        defaultExpandIcon={<AiOutlineArrowUp />}
        sx={{
          flexGrow: 1,
          maxHeight: 300,
          overflowY: "auto",
        }}
      >
        <TreeItem
          nodeId="1"
          label={
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              Campos de atividade:
            </Typography>
          }
        >
          {fieldOfActivity.map((e, index) => (
            <div
              key={index}
              // onClick={() => {
              //   console.log(logos[`${e.base}`])
              // }}
            >
              <Link href={`${e.uri}`} target="_blanck">
              
              <StyledTreeItem
                nodeId={`${index + 5}`}
                labelText={e.label}
                labelIcon={logos[`${e.base}`]}
                color={"#1a73e8"}
                bgColor="#e8f0fe"
                colorForDarkMode="#B8E7FB"
                bgColorForDarkMode="#071318"
              />
              </Link>
            </div>
          ))}
        </TreeItem>
      </TreeView>
  );
}