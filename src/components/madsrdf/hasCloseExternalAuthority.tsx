import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Box, Typography } from "@mui/material";

import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

import StyledTreeItem from "@/components/baseMui/styledTreeItem"

// Next
import Link from "next/link";

import { logos } from "@/share/objLogos"

import { schemaUri } from "@/schema/authority";

type Props = {
  hasCloseExternalAuthority: schemaUri[]
};

export default function HasCloseExternalAuthority({ hasCloseExternalAuthority }: Props) {
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
              Ocorrências semelhantes em outras bases:
            </Typography>
          }>
                <Box sx={{ display: 'flex',
                flexDirection: 'column'}}>
                    {
                        hasCloseExternalAuthority.map((e, index) => (
                            <Link key={index} href={e.uri} target="_blank">
                                <StyledTreeItem
                                    nodeId={`${index + 5}`}
                                    labelText={e.label}
                                    labelIcon={logos[`${e.base}`]}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                    colorForDarkMode="#B8E7FB"
                                    bgColorForDarkMode="#071318"
                                />
                            </Link>
                        ))
                    }

                </Box>

            </TreeItem>
        </TreeView>

    )
}