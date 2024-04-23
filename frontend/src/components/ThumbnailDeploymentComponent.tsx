import { useState } from "react"
import ThumbnailComponent from "./ThumbnailComponent"


const ThumbnailDeploymentComponent = () => {

    const [file, setFile] = useState<any>(null)
    const [thumbnail, setThumbnail] = useState<string | null>(null)
    const [modifyState, setModifyState] = useState<boolean>(false)

    const saveThumbnail = () => {

    }

    const deleteThumbnail = () => {

    }

    const clear = () => {
        setFile("");
      };

      const get_file_name = (fileName) => {
        // Cette expression régulière correspond à tous les types d'extensions d'images mentionnés
        const match = fileName.match(/([^\/]+\.(png|jpg|jpeg|gif|bmp))/i);
        return match ? match[1] : null;
    }

    return <ThumbnailComponent saveThumbnail={saveThumbnail} deleteThumbnail={deleteThumbnail} file={file} setFile={setFile} thumbnail={thumbnail} modifyState={modifyState} setModifyState={setModifyState} />
}

export default ThumbnailDeploymentComponent