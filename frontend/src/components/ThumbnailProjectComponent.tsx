import { useEffect, useState } from "react";
import ThumbnailComponent from "./ThumbnailComponent";
import { useMainContext } from "../contexts/mainContext";
import { FilesService, ProjectWithDeployment } from "../client";

const ThumbnailProjectComponent = () => {
    const {project, updateProjects} = useMainContext()
    const [file, setFile] = useState<any>(null)
    const [thumbnail, setThumbnail] = useState<any>(null)
    const [modifyState, setModifyState] = useState<boolean>(false)
    const [currentProject, setCurrentProject] = useState<ProjectWithDeployment | null>(null)

    useEffect(() => {

        setCurrentProject(project())
        if(currentProject != null && currentProject.image?.startsWith("http"))
        {
            setThumbnail(currentProject.image)
        }
    }, [currentProject])

    const saveThumbnail = () => {
        if(currentProject)
        {
          FilesService.uploadProjectFile(currentProject?.id, {file})
          .then(res => {
            console.log(res)
            updateProjects()
            setThumbnail(res.image)
          })  
        }
        
        clear()
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

    const deleteThumbnail = () => {

        if(currentProject)
        {
            console.log(thumbnail)
            console.log(get_file_name(thumbnail))
            FilesService.deleteProjectFile(currentProject?.id, get_file_name(thumbnail))
            updateProjects()
            setThumbnail(null)    
            
        }

  

    }
    return <ThumbnailComponent saveThumbnail={saveThumbnail} deleteThumbnail={deleteThumbnail} thumbnail={thumbnail} setFile={setFile} file={file} modifyState={modifyState} setModifyState={setModifyState}/>
}

export default ThumbnailProjectComponent;