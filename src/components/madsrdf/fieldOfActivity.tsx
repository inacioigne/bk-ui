// "use client";
// MUI Components
import { Typography, Box } from "@mui/material";
import { TreeView } from '@mui/x-tree-view/TreeView';
// import { TreeItem} from '@mui/x-tree-view/TreeItem';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { TreeItem, TreeItemProps, treeItemClasses } from '@mui/x-tree-view/TreeItem';
// import { SvgIconProps } from '@mui/material/SvgIcon';
// import { styled, useTheme } from '@mui/material/styles';
// // forwardRef
// import { forwardRef } from 'react';

import { BsLink45Deg } from "react-icons/bs";

import { schemaUri } from "@/schema/authority";

import StyledTreeItem from "@/components/baseMui/styledTreeItem"

// Bibliokeia Services
import { LocAuthority } from "@/services/importation/locAuthority"


type Props = {
  fieldOfActivity: schemaUri[]
  setHit: Function
};

export default function FieldOfActivity({ fieldOfActivity, setHit }: Props) {
  return (
    <Box sx={{ pl: "10px" }}>
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
            <div key={index} onClick={() => {
              LocAuthority(setHit, e.uri)
              console.log(e)}}>
            <StyledTreeItem
              nodeId={`${index + 5}`}
              labelText={e.label}
              labelIcon={BsLink45Deg}
              color="#1a73e8"
              bgColor="#e8f0fe"
              colorForDarkMode="#B8E7FB"
              bgColorForDarkMode="#071318"
            />

          </div>
          ))}
        </TreeItem>
      </TreeView>
    </Box>
  );
}