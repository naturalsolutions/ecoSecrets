import { FC } from "react";
import TabPanel from "../tabPanel";
import { useAnnotationContext } from "../../contexts/annotationContext";
import NestedList from "../common/collapsableButton";
import MetadataDateTimeInput from "./MetadataDateTimeInput";
import { useFilesContext } from "../../contexts/filesContext";

interface MetadataTabProps {
    valueTab: number;
    index: number;
};

const MetadataTab: FC<MetadataTabProps> = ({
    valueTab,
    index
}) => {
    const { selectedMedias, metadata, gridView } = useAnnotationContext();
    const { currentImage } = useFilesContext();

    return(
        
        <TabPanel 
            valueTab={ valueTab } 
            index={ index }
        >
            { gridView ? 
                (selectedMedias.map((item) => (
                    <NestedList text={ item.name } >
                        <MetadataDateTimeInput id={item.id} date={item.date} />
                    </NestedList>
            ))) :
                <MetadataDateTimeInput id={currentImage} date={metadata?.date} />
            }
        </TabPanel >
    )
};
export default MetadataTab;