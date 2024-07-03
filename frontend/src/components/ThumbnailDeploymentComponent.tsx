import { useEffect, useState } from "react"
import ThumbnailComponent from "./ThumbnailComponent"
import { DeploymentsService, FilesService } from "../client"
import { useMainContext } from "../contexts/mainContext"
import { useParams } from "react-router-dom"


const ThumbnailDeploymentComponent = () => {
    
    const {deploymentData,updateDeploymentData} = useMainContext()

    const [file, setFile] = useState<any>(null)
    const [thumbnail, setThumbnail] = useState<string | null>(null)
    const [modifyState, setModifyState] = useState<boolean>(false)

    useEffect(() => {
      console.log(deploymentData)
      if(deploymentData)
        {
          DeploymentsService.readDeploymentThumbnail(deploymentData.id)
          .then(res => {
            setThumbnail(res[0].url)
            fetch(res[0].url).then(r => {
              if(r.status != 200) {
                setThumbnail(null)
              }
            })
          })  
        }

    }, [deploymentData])

    const saveThumbnail = async () => {
        if(deploymentData)
        {

          FilesService.uploadDeploymentFile(deploymentData?.id, {file})
          .then(res => {
            DeploymentsService.readDeploymentThumbnail(deploymentData?.id)
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

    return <ThumbnailComponent text="deployment" saveThumbnail={saveThumbnail} file={file} setFile={setFile} thumbnail={thumbnail} modifyState={modifyState} setModifyState={setModifyState} />
}

export default ThumbnailDeploymentComponent