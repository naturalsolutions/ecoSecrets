import { Grid, capitalize } from "@mui/material";
import DropzoneComponent from "./dropzoneComponent";
import ButtonsYesNo from "./common/buttonsYesNo";
import { useState, useRef, Dispatch } from "react";
import { useTranslation } from "react-i18next";
import Thumbnail from "./Thumbnail";
import ModifyThumbnail from "./ModifyThumbnail";

type thumbnailFunction = () => void;

const ThumbnailComponent: React.FC<{saveThumbnail: thumbnailFunction, thumbnail:string | null,file:any , setFile:any, modifyState:boolean, setModifyState:Dispatch<React.SetStateAction<boolean>>}> = ({saveThumbnail, thumbnail, file, setFile, modifyState, setModifyState}) => {

    const { t } = useTranslation();
    const fileInputRef = useRef<any>(null);
    // const [file, setFile] = useState<any>(null);

    const loadFile = (f: any) => {

        setFile(f[0])
      }
      const handleButtonClick = () => {
        fileInputRef.current.click(); // Déclenche un clic sur l'input de type fichier
      };
      const dropZoneDisplayText = () => {
        
        if (!file) {
          return (
            <p>{`${capitalize(t("main.add_media"))} ${t("main.of")} ${t("devices.device")}`}</p>
          );
        } else {
            console.log("called")
          return <p>{file.name}</p>;
        }
      };

      const clear = () => {
        setFile("");
      };

      const loadNewFile = (f: any) => {
        console.log("new")
        setFile(f[0])
        setModifyState(true)
      }

      const cancelModify = () => {
        console.log("cancel")
        fileInputRef.current.value = "";
        setModifyState(false)
      }
    return <Grid item lg={6}>      
    {!thumbnail ? <> 
    
    <DropzoneComponent onDrop={loadFile} sentence={dropZoneDisplayText} /> 
    <div style={{marginTop: "25px"}}></div>
    <ButtonsYesNo
        onYes={saveThumbnail}
        onNo={clear}
        yesContent={capitalize(t("main.save"))}
        noContent={capitalize(t("main.cancel"))}
      />
       </>
       : (<> <Thumbnail item={thumbnail}/>
             <ModifyThumbnail handleButtonClick={handleButtonClick}setFile={loadNewFile} modifyRef={fileInputRef} modifyState={modifyState} saveNewThumbnail={saveThumbnail} cancelModify={cancelModify} />
        </>)
     }
      
    </Grid>
}

export default ThumbnailComponent;