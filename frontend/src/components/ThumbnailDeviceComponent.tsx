
import { useState, useEffect } from "react"
import { Devices, DevicesService, FilesService } from "../client"
import { useMainContext } from "../contexts/mainContext"

import ThumbnailComponent from "./ThumbnailComponent"




const ThumbnailDeviceComponent = () => {
    

    const { device, updateDeviceMenu,} = useMainContext()
    const [thumbnail, setThumbnail] = useState<any>(null);
    const [modifyState, setModifyState] = useState<boolean>(false)
    const [deviceData, setDeviceData] = useState<Devices>(device());
    const [file, setFile] = useState<any>(null);

    useEffect(() => {
      setDeviceData(device()) 
      if(deviceData)
        {
          DevicesService.readDeviceThumbnail(deviceData.id)
          .then(res => {
            setThumbnail(res[0].url)
          })  
        }

    }, [deviceData])

    const saveThumbnail = async () => {
        if(deviceData)
        {

          FilesService.uploadDeviceFile(deviceData.id, {file})
          .then(res => {
            // updateProjects()
            DevicesService.readDeviceThumbnail(deviceData.id)
            .then(res => {
              console.log(res[0].url)
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

    

    return <ThumbnailComponent  saveThumbnail={saveThumbnail} thumbnail={thumbnail} file={file} setFile={setFile} modifyState={modifyState} setModifyState={setModifyState}/>
}

export default ThumbnailDeviceComponent