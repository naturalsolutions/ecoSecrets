import { useEffect, useState } from "react"
import ThumbnailComponent from "./ThumbnailComponent"
import { FilesService } from "../client"
import { useMainContext } from "../contexts/mainContext"
import { useParams } from "react-router-dom"


const ThumbnailDeploymentComponent = () => {
    
    const {deploymentData,updateDeploymentData} = useMainContext()

    const [file, setFile] = useState<any>(null)
    const [thumbnail, setThumbnail] = useState<string | null>(null)
    const [modifyState, setModifyState] = useState<boolean>(false)
    
    useEffect(() => {    

        if(deploymentData && deploymentData.image != null && deploymentData.image.startsWith("http"))
        {
        
            setThumbnail(deploymentData.image)
        }
        
      }, [deploymentData])

    const saveThumbnail = () => {
        
        FilesService.uploadDeploymentFile(deploymentData.id, {file})
        .then(res => {
            updateDeploymentData()
            setThumbnail(res.image)
        })  

        clear()
        setModifyState(false)
    }

    const deleteThumbnail = () => {
        FilesService.deleteDeploymentFile(deploymentData.id, get_file_name(thumbnail))
        .then(res => {
            updateDeploymentData()
            setThumbnail(null)
        })
    }

    const clear = () => {
        setFile("");
      };

      const get_file_name = (fileName) => {
        // Cette expression régulière correspond à tous les types d'extensions d'images mentionnés
        const match = fileName.match(/([^\/]+\.(png|jpg|jpeg|gif|bmp))/i);
        return match ? match[1] : null;
    }

    return <ThumbnailComponent saveThumbnail={saveThumbnail} file={file} setFile={setFile} thumbnail={thumbnail} modifyState={modifyState} setModifyState={setModifyState} />
}

export default ThumbnailDeploymentComponent