import { useEffect, useState } from "react";
import ThumbnailComponent from "./ThumbnailComponent";
import { useMainContext } from "../contexts/mainContext";
import { FilesService, ProjectWithDeployment, ProjectsService } from "../client";

const ThumbnailProjectComponent = () => {
    const {projectSheetData} = useMainContext()
    const [file, setFile] = useState<any>(null)
    const [thumbnail, setThumbnail] = useState<any>(null)
    const [modifyState, setModifyState] = useState<boolean>(false)

    useEffect(() => {
      console.log(projectSheetData)
      if(projectSheetData)
        {
          ProjectsService.readProjectThumbnail(projectSheetData?.id)
          .then(res => {
            setThumbnail(res[0].url)
            console.log("true")
          })  
        }

    }, [projectSheetData])

    const saveThumbnail = async () => {
        if(projectSheetData)
        {

          FilesService.uploadProjectFile(projectSheetData?.id, {file})
          .then(res => {
            // updateProjects()
            ProjectsService.readProjectThumbnail(projectSheetData?.id)
            .then(res => {
              setThumbnail(res[0].url)
            })  
          })  
        }
        
        setModifyState(false)
    }
    
    const clear = () => {
        setFile("");
      };
    
      const get_file_name = (fileName) => {
        // Cette expression régulière correspond à tous les types d'extensions d'images mentionnés
        const match = fileName.match(/([^\/]+\.(png|jpg|jpeg|gif|bmp))/i);
        return match ? match[1] : null;
    }

    return <ThumbnailComponent  saveThumbnail={saveThumbnail} thumbnail={thumbnail} setFile={setFile} file={file} modifyState={modifyState} setModifyState={setModifyState}/>
}

export default ThumbnailProjectComponent;