
import { useState, useEffect } from "react"
import { Devices, FilesService } from "../client"
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

        if(deviceData.image != null && deviceData.image.startsWith("http"))
          {
            console.log(deviceData.image)
            setThumbnail(deviceData.image)
          }
        
      }, [])

   
    const saveThumbnail = () =>{
      console.log(file)
      console.log(deviceData.id)
        FilesService
          .uploadDeviceFile(Number(deviceData.id), { file })
          .then((res) => {
            console.log(res)
            updateDeviceMenu()
            setThumbnail(res.image)
            // updateListFile()
            // setDeviceData(device())
          });
  
        clear();
        setModifyState(false)
  
    };

    const clear = () => {
        setFile("");
      };

      const get_file_name = (fileName) => {
        // Cette expression régulière correspond à tous les types d'extensions d'images mentionnés
      
        const match = fileName.match(/([^\/]+\.(png|jpg|jpeg|gif|bmp))/i);
        return match ? match[1] : null;
    }
    

    return <ThumbnailComponent type="device" saveThumbnail={saveThumbnail} thumbnail={thumbnail} file={file} setFile={setFile} modifyState={modifyState} setModifyState={setModifyState}/>
}

export default ThumbnailDeviceComponent