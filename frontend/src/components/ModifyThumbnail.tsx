import { Stack, capitalize } from "@mui/material"
import ButtonsYesNo from "./common/buttonsYesNo"
import { useTranslation } from "react-i18next";
import ButtonValidate from "./common/buttonValidate";
import ButtonModify from "./common/buttonModify";


const ModifyThumbnail = ({handleButtonClick, setFile, saveNewThumbnail, modifyState, cancelModify, modifyRef}) => {
    const { t } = useTranslation();

    // return <div style={{marginTop:"20px"}}>
    //     <label htmlFor="modify" style={{cursor: "pointer",  marginRight: "20px", backgroundColor: "#2FA37C", color: "white", padding: "15px", borderRadius: "5px"}}>{content}</label>
 
    //     {modifyState && <ButtonsYesNo
    //       onYes={saveNewThumbnail}
    //       onNo={cancelModify}
    //       yesContent={capitalize(t("main.save"))}
    //       noContent={capitalize(t("main.cancel"))}
    //     />}
    //     <button onClick={deleteThumbnail} style={{cursor: "pointer",marginLeft:"20px",  marginRight: "20px", backgroundColor: "#FF2930", color: "white", padding: "15px", borderRadius: "5px", border: "none", fontSize: "17px"}}>Delete</button>
        
    // </div>

    return <>
            <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                >
      <input ref={modifyRef} type="file" id="modify" name="modify" onChange={(e) =>
         {
          if(!modifyState) {
            setFile(e.target.files)
          } else {
            cancelModify()
          }
         }} style={{display: "none"}}/>   
      <label htmlFor="modify">

                        <ButtonModify
                            content={ 
                                modifyState ? 
                                <>{capitalize(t("main.cancel"))}</> : 
                                <>{capitalize(t("main.modify"))}</>
                            }
                            edit={handleButtonClick}
                            variant={ modifyState }
                        />
      </label>
      <ButtonValidate 
            content={ capitalize(t("main.save")) }
            validate={saveNewThumbnail}
            disabled={ !modifyState }
          />
          {/* <button onClick={deleteThumbnail} style={{cursor: "pointer",marginLeft:"20px",  marginRight: "20px", backgroundColor: "#9D2930", color: "white", padding: "8px", borderRadius: "25px", border: "none", fontSize: "17px", boxShadow: "0px 0px 2px black"}}>{capitalize(t("main.delete"))}</button> */}
          </Stack>
    </>
    

}

export default ModifyThumbnail