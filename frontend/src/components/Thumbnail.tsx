import { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";


const Thumbnail = (item) => {

    const thumbnailStyle: CSSProperties = {
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        display: "block",
        height: 400,
        width: 400,
        objectFit: "cover"
    }

    let navigate = useNavigate();

    const displayMedia = (id: string) => {
        navigate(`${id}`);
    };

    const displayImage = (item) => {
          return (
            <img
                src={ `${item}` }
                alt="Miniature"
                loading="lazy"
                onClick={ () => displayMedia(item.id) }
                style={ thumbnailStyle }
            />
          )
    };

    return(
            <div 
                 style={{
                //     border: "2px solid",
                     borderRadius: "5px",
                //     borderColor: item.treated ? "green" : "red"
                 }}
            >
                { displayImage(item.item) }
            </div>
    )
}

export default Thumbnail;