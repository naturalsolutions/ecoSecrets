import { capitalize } from "@mui/material"
import ButtonsYesNo from "./common/buttonsYesNo"
import { useTranslation } from "react-i18next";


const ModifyThumbnail = ({content, setFile, saveNewThumbnail, deleteThumbnail, modifyState, cancelModify, modifyRef}) => {
    const { t } = useTranslation();

    return <div style={{marginTop:"20px"}}>
        <label htmlFor="modify" style={{cursor: "pointer",  marginRight: "20px", backgroundColor: "#2FA37C", color: "white", padding: "15px", borderRadius: "5px"}}>{content}</label>
        <input ref={modifyRef} type="file" id="modify" name="modify" onChange={(e) => setFile(e.target.files)} style={{display: "none"}}/>    
        {modifyState && <ButtonsYesNo
          onYes={saveNewThumbnail}
          onNo={cancelModify}
          yesContent={capitalize(t("main.save"))}
          noContent={capitalize(t("main.cancel"))}
        />}
        <button onClick={deleteThumbnail} style={{cursor: "pointer",marginLeft:"20px",  marginRight: "20px", backgroundColor: "#FF2930", color: "white", padding: "15px", borderRadius: "5px", border: "none", fontSize: "17px"}}>Delete</button>
        
    </div>

}

export default ModifyThumbnail