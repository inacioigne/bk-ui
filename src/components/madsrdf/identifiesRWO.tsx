import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Box } from "@mui/material";

import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

import StyledTreeItem from "@/components/baseMui/styledTreeItem"

// Next
import Link from "next/link";

import { logos } from "@/share/objLogos"

type Props = {
    identifiesRWO: string[]
};

export default function IdentifiesRWO({ identifiesRWO }: Props) {
    return (
        <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<AiOutlineArrowDown />}
            defaultExpandIcon={<AiOutlineArrowUp />}
            defaultExpanded={['1']}
            sx={{
                flexGrow: 1, overflowY: 'auto'
            }}
        >

            <TreeItem nodeId="1" label="Identificado por">
                <Box sx={{ display: 'flex', //gap: '5px', 
                flexDirection: 'column'}}>
                    {
                        identifiesRWO.map((rwo, index) => (
                            <Link key={index} href={rwo} target="_blank">
                                <StyledTreeItem
                                    nodeId={`${index + 5}`}
                                    labelText={rwo}
                                    labelIcon={logos[`${rwo.split('/')[2]}`]}
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