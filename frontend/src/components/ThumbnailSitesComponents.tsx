import { useEffect, useState } from "react"
import ThumbnailComponent from "./ThumbnailComponent"
import { FilesService, Sites, SitesService } from "../client"
import { useMainContext } from "../contexts/mainContext"


const ThumbnailSitesComponent = () => {
    const {sites, site} = useMainContext()
    const [file, setFile] = useState<any>(null)
    const [thumbnail, setThumbnail] = useState<string | null>(null)
    const [modifyState, setModifyState] = useState<boolean>(false)
    const [actualSite, setActualSite] = useState<Sites | null>(null)

    useEffect(() => {
      setActualSite(site()) 
      if(actualSite)
        {
          console.log(actualSite.id)
          SitesService.readSiteThumbnail(actualSite.id)
          .then(res => {
            setThumbnail(res[0].url)
          })  
        }

    }, [actualSite])

    const saveThumbnail = async () => {
        if(actualSite)
        {

          FilesService.uploadSiteFile(actualSite.id, {file})
          .then(res => {
            // updateProjects()
            SitesService.readSiteThumbnail(actualSite.id)
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

    return <ThumbnailComponent saveThumbnail={saveThumbnail}  file={file} setFile={setFile} thumbnail={thumbnail} modifyState={modifyState} setModifyState={setModifyState} />
}

export default ThumbnailSitesComponent