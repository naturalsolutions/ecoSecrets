

const ModifyThumbnail = ({content, setFile, saveNewThumbnail}) => {
    return <>
        <label htmlFor="modify" style={{cursor: "pointer"}}>{content}</label>
        <input type="file" id="modify" name="modify" onChange={(e) => setFile(e.target.files)} style={{display: "none"}}/>    
        <button onClick={saveNewThumbnail}>Ok</button>
    </>

}

export default ModifyThumbnail