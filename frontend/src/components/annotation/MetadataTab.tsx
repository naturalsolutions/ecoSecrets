import { FC } from "react";
import TabPanel from "../tabPanel";
import { useAnnotationContext } from "../../contexts/annotationContext";
import NestedList from "../common/collapsableButton";
import MetadataDateTimeInput from "./MetadataDateTimeInput";

interface MetadataTabProps {
    valueTab: number;
    index: number;
};

const MetadataTab: FC<MetadataTabProps> = ({
    valueTab,
    index
}) => {
    const { selectedMedias } = useAnnotationContext();
    const { gridView } = useAnnotationContext();

    return(
        
        <TabPanel 
            valueTab={ valueTab } 
            index={ index }
        >
            { gridView ? 
                (selectedMedias.map((item) => (
                    <NestedList text={ item.name } >
                        <MetadataDateTimeInput />
                    </NestedList>
            ))) :
                <MetadataDateTimeInput />
            }
        </TabPanel >
    )
};
export default MetadataTab;