// MUI Components
import { Typography, Box } from "@mui/material";
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

import StyledTreeItem from "@/components/baseMui/styledTreeItem"

import { BsLink45Deg } from "react-icons/bs";

import { logos } from "@/share/objLogos"

import { LocAuthority } from "@/services/importation/locAuthority"

interface ElementMads {
    label: string
    base?: string
    uri?: string
    type?: string
}

type Props = {
    label: string
    setHit: Function
    items: ElementMads[]
};

export default function ListMads({ label, setHit, items }: Props) {
    return (
        <TreeView
            aria-label="FieldOfActivity"
            defaultCollapseIcon={<AiOutlineArrowDown />}
            defaultExpandIcon={<AiOutlineArrowUp />}
            defaultExpanded={['1']}
            // sx={{
            //     flexGrow: 1,
            //     maxHeight: 300,
            //     overflowY: "auto",
            // }}
        >
            <TreeItem
                nodeId="1"
                label={
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                        {label}
                    </Typography>
                }
                
            >
                <Box
                sx={{
                    flexGrow: 1,
                    maxHeight: 300,
                    overflowY: "auto",
                }}
                >

               
                {items.map((e, index) => (
                    <div key={index} onClick={() => {
                        LocAuthority(setHit, e.uri)
                        // console.log(e)
                    }}>
                        <StyledTreeItem
                            nodeId={`${index + 5}`}
                            labelText={e.label}
                            labelIcon={logos[`${e.base}`]}
                            color="#1a73e8"
                            bgColor="#e8f0fe"
                            colorForDarkMode="#B8E7FB"
                            bgColorForDarkMode="#071318"
                        />

                    </div>
                ))}
                 </Box>

            </TreeItem>

        </TreeView>

    )
}