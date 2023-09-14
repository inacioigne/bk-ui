import {
  Box
} from "@mui/material";
import { TreeView } from '@mui/x-tree-view/TreeView';
import StyledTreeItem from "@/components/baseMui/styledTreeItem"

// Reacts Icons
import { RiFilterLine } from 'react-icons/ri';
import { BsArrowsAngleContract, BsArrowsAngleExpand } from 'react-icons/bs';

// BiblioKeia Services
import { SearchNames } from "@/services/searchNames";

// Types BiblioKeia
import Facet from "@/utils/types"

// Providers BiblioKeia
import { useParmasAutority } from "src/providers/paramsAuthority"

interface FacetProps {
  facets: Facet[];
  setRows: Function;
  setFacetType: Function;
  setFacetAffiliation: Function;
  setOccupation: Function;
  setRowCount: Function;
}

const Affiliation: React.FC<FacetProps> = ({
  facets,
  setRows,
  setRowCount,
  setFacetType,
  setFacetAffiliation,
  setOccupation,
}) => {

  const { paramsAuthority, updateParamsAuthority } = useParmasAutority()


  const handleFacet = (facet: Facet, params: URLSearchParams) => {

    if (!params.getAll('fq').includes(`affiliation:${facet.name}`)) {
      params.append('fq', `affiliation:${facet.name}`);
      SearchNames(paramsAuthority, setRows, setRowCount, setFacetType, setFacetAffiliation, setOccupation);  
    }

  }

  return (
    <TreeView
      defaultCollapseIcon={<BsArrowsAngleExpand />}
      defaultExpandIcon={<BsArrowsAngleContract />}
      sx={{
        flexGrow: 1, overflowY: 'auto'
      }}
    >
      <StyledTreeItem nodeId="1" labelText="Afiliação" labelIcon={RiFilterLine}>
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
  )

}

export default Affiliation;