// "use client";
// MUI Components
import { Typography, Box } from "@mui/material";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import {
  TreeItem,
  TreeItemProps,
  treeItemClasses,
} from "@mui/x-tree-view/TreeItem";
import { BsLink45Deg } from "react-icons/bs";

import { schemaUri } from "@/schema/authority";

import StyledTreeItem from "@/components/baseMui/styledTreeItem";

// Bibliokeia Services
import { LocAuthority } from "@/services/importation/locAuthority";

type Props = {
  occupation: schemaUri[];
  setHit: Function;
};

export default function Occupation({ occupation, setHit }: Props) {
  return (
    <Box sx={{ pl: "10px" }}>
      <TreeView
        aria-label="occupation"
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
              Ocupações:
            </Typography>
          }
        >
          {occupation.map((e, index) => (
            <div
              key={index}
              onClick={() => {
                e.uri && LocAuthority(setHit, e.uri);
              }}
            >
              <StyledTreeItem
                nodeId={`${index + 5}`}
                labelText={e.label}
                labelIcon={e.uri ? BsLink45Deg : null}
                color={"#1a73e8"}
                bgColor="#e8f0fe"
                colorForDarkMode="#B8E7FB"
                bgColorForDarkMode="#071318"
                // sx={{ cursor: 'none'}}
              />
            </div>
          ))}
        </TreeItem>
      </TreeView>
    </Box>
  );
}
