import "../../css/buttonStatus.css";

function ButtonStatus({ icon, title, stylClassButton }) {
    return (
        <span className={'inf-btn-ctn ' + stylClassButton}>
            {icon} {title}
        </span>
    )
}

export default ButtonStatus