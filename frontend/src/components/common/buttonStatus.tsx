import "../../css/buttonStatus.css";

function ButtonStatus({ icon, title, stylClassButton }) {
    return (
        <div className={'inf-btn-ctn ' + stylClassButton}
        >{icon} <p>{title}</p></div >
    )
}

export default ButtonStatus