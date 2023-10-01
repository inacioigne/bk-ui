"use client"
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Box, Typography } from "@mui/material";

import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

import StyledTreeItem from "@/components/baseMui/styledTreeItem"

import { schemaUri } from "@/schema/authority"

// Next
import Link from "next/link";

import { logos } from "@/share/objLogos"



type Props = {
    identifiesRWO: schemaUri | schemaUri[]
};

export default function IdentifiesRWO({ identifiesRWO }: Props) {
    return (
        <TreeView
            aria-label="IdentifiesRWO"
            defaultCollapseIcon={<AiOutlineArrowDown />}
            defaultExpandIcon={<AiOutlineArrowUp />}
            sx={{
                flexGrow: 1, overflowY: 'auto'
            }}
        >

            <TreeItem nodeId="1" label={
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              Identificado por:
            </Typography>
          }>
            {Array.isArray(identifiesRWO) ? (
                 <Box sx={{ display: 'flex',
                 flexDirection: 'column'}}>
                     {
                         identifiesRWO.map((rwo, index) => (
                             <Link key={index} href={`${rwo.uri}`} target="_blank">
                                 <StyledTreeItem
                                     nodeId={`${index + 5}`}
                                     labelText={rwo.label}
                                     labelIcon={logos[`${rwo.base}`]}
                                     color="#1a73e8"
                                     bgColor="#e8f0fe"
                                     colorForDarkMode="#B8E7FB"
                                     bgColorForDarkMode="#071318"
                                 />
                             </Link>
                         ))
                     }
                 </Box>
            ): (<Link href={`${identifiesRWO.uri}`} target="_blank">
            <StyledTreeItem
                nodeId={"5"}
                labelText={`${identifiesRWO.uri}`}
                labelIcon={logos[`${identifiesRWO.base}`]}
                color="#1a73e8"
                bgColor="#e8f0fe"
                colorForDarkMode="#B8E7FB"
                bgColorForDarkMode="#071318"
            />
        </Link>)}
               

            </TreeItem>
        </TreeView>

    )
}