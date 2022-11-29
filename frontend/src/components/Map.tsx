import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = (props) => {
    return (
        <MapContainer center={props.position.length !== undefined ? props.position[0] : props.position} zoom={props.zoom} scrollWheelZoom={true}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                !props.position[0] ?
                    <Marker position={props.position}>
                        <Popup>
                            {props.position.name}
                        </Popup>
                    </Marker> :
                    props.position.map((pos, k) => (
                        <Marker key={k} position={pos}>
                            <Popup>
                                {pos.name}
                            </Popup>
                        </Marker>
                    ))
            }
        </MapContainer>
    )
}
export default Map;