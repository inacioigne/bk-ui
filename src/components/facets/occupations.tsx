import {
    Box
} from "@mui/material";
import { TreeView } from '@mui/x-tree-view/TreeView';

// BiblioKeia Services
import { SearchNames } from "@/services/searchNames";

// Reacts Icons
import { RiFilterLine } from 'react-icons/ri';
import { BsArrowsAngleContract, BsArrowsAngleExpand } from 'react-icons/bs';

import StyledTreeItem from "@/components/baseMui/styledTreeItem"

// Types BiblioKeia
import Facet from "@/utils/types"

// Providers BiblioKeia
import { useParmasAutority } from "src/providers/paramsAuthority"

interface FacetProps {
    facets: Facet[];
    setRows: Function;
    setRowCount: Function;
    setFacetType: Function;
    setFacetAffiliation: Function;
    setOccupation: Function;
  }

const Occupations: React.FC<FacetProps> = ({
    facets,
    setRows,
    setRowCount,
    setFacetType,
    setFacetAffiliation,
    setOccupation,
}) => {

    const { paramsAuthority } = useParmasAutority()

    const handleFacet = (facet: Facet, params: URLSearchParams) => {

        if (!params.getAll('fq').includes(`occupation:${facet.name}`)) {
            params.append('fq', `occupation:${facet.name}`)
            SearchNames(paramsAuthority, setRows, setRowCount, setFacetType, setFacetAffiliation, setOccupation);       
          }

    }

    return (
        <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<BsArrowsAngleExpand />}
            defaultExpandIcon={<BsArrowsAngleContract />}
            sx={{
                flexGrow: 1, overflowY: 'auto'
            }}
        >
            <StyledTreeItem nodeId="1" labelText="Ocupações" labelIcon={RiFilterLine}>

                <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {
                        facets?.map((facet, index) => (
                            <StyledTreeItem
                                key={index}
                                nodeId={`${index + 2}`}
                                labelText={facet.name}
                                labelInfo={facet.count}
                                color="#a250f5"
                                bgColor="#f3e8fd"
                                colorForDarkMode="#D9B8FB"
                                bgColorForDarkMode="#100719"
                                onClick={() => {
                                    handleFacet(facet, paramsAuthority)
                                  }}
                            />
                        ))
                    }
                </Box>
            </StyledTreeItem>
        </TreeView>
    );
};

export default Occupations;