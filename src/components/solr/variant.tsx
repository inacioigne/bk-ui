"use client";
// MUI Components
import { Typography, Box } from "@mui/material";
import {
  TreeItem,
} from "@mui/x-tree-view/TreeItem";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

import StyledTreeItem from "@/components/baseMui/styledTreeItem";

type Props = {
  hasVariant: string[];
};

export default function HasVariant({ hasVariant }: Props) {
  return (
    <TreeView
      aria-label="hasVariant"
      defaultCollapseIcon={<AiOutlineArrowDown />}
      defaultExpandIcon={<AiOutlineArrowUp />}
      defaultExpanded={["1"]}
    > 
      <TreeItem
        nodeId="1"
        label={
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            Variantes do nome:
          </Typography>
        }
      >
        <Box sx={{
          flexGrow: 1,
          maxHeight: 300,
          overflowY: "auto",
        }}>
          {hasVariant.map((variant, index) => (
            <StyledTreeItem
              key={index}
              nodeId={`${index + 5}`}
              labelText={variant}
              color="#1a73e8"
              bgColor="#e8f0fe"
              colorForDarkMode="#B8E7FB"
              bgColorForDarkMode="#071318"
            />
          ))}
        </Box>
      </TreeItem>
    </TreeView>
  );
}
