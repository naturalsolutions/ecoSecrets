import { useNavigate } from "react-router-dom";


const Thumbnail = (item) => {

    const thumbnailStyle = {
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        display: "block",
        height: "50%"
    }

    let navigate = useNavigate();

    const displayMedia = (id: string) => {
        navigate(`${id}`);
    };

    const displayImage = (item) => {
        if (item.extension.includes("image")) {
          return (
            <img
                src={ `${item.url}` }
                alt={ item.name }
                loading="lazy"
                onClick={ () => displayMedia(item.id) }
                style={ thumbnailStyle }
            />
          )
        }
        else {
            return(
                <video
                    style={ thumbnailStyle }
                    onClick={ () => displayMedia(item.id) }
                >
                    <source 
                        src={ `${item.url}#t=1` } // t value can be ajusted to display a specific start time as video thumbnail
                        type="video/mp4"
                    />
                    { item.name }
                </video>
            )
        }
    };

    // const displayName = (name) => {
    //     return(
    //         <Tooltip title={ name } placement="bottom" arrow>
    //             <Typography 
    //                 noWrap 
    //                 component={"span"}
    //                 variant="body2"
    //                 sx={{ width: "90%" }}
    //             >
    //                 { name }
    //             </Typography>
    //         </Tooltip>
    //     )
    // }

    const displayThumbnail = (item) => {

        if (item.extension.includes("image")) {
            return (
                <>
                    { displayImage(item) }
                    {/* <Grid 
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <CameraAltIcon sx={{ color: "#616161E5", width: "10%" }}/>
                        { displayName(item.name) }
                    </Grid> */}
                </>
            )
         }
        else { 
            return (
                <>
                    { displayImage(item) }
                    {/* <Grid 
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <VideocamIcon  sx={{ color: "#616161E5", width: "10%" }} />
                        { displayName(item.name) }
                    </Grid> */}
                </>
            )
        };
    };

    return(
            <div 
                 style={{
                //     border: "2px solid",
                     borderRadius: "5px",
                //     borderColor: item.treated ? "green" : "red"
                 }}
            >
                { displayThumbnail(item.item) }
            </div>
    )
}

export default Thumbnail;