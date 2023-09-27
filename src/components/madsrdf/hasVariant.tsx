"use client";
// MUI Components
import { Typography, Box } from "@mui/material";
// import TreeView from "@mui/lab/TreeView";
// import TreeItem from "@mui/lab/TreeItem";
import { TreeItem, TreeItemProps, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { TreeView } from '@mui/x-tree-view/TreeView';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function HasVariant({ hasVariant }) {
  return (
    <Box sx={{ pl: "10px" }}>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
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
              Variantes do nome:
            </Typography>
          }
        >
          {hasVariant.map((variant, index) => (
            <TreeItem key={index} nodeId={"2"} label={variant.variantLabel} />
          ))}
        </TreeItem>
      </TreeView>
    </Box>
  );
}