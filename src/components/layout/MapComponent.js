import React, { useState } from 'react';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
// import { Icon } from 'leaflet';

import { connect } from 'react-redux'
// const iconMarker = new Icon({
//     iconUrl: "/marker2.svg",
//     iconSize: [40, 40]
// })
function MapComponent(props) {
    const [activePopup, setActivePopup] = useState(null);
    let tasks = props.tasks
    console.log(props);
    return (
        <div className='map'>


            <Map center={[44.82081203, 20.41482925]} zoom={11}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {tasks && tasks.map((item) => (
                    <div key={item.task_ID}>
                        <Marker position={[
                            item.taskLatitude,
                            item.taskLongitude
                        ]}
                            onclick={() => {
                                setActivePopup(item)
                            }}
                        // icon={iconMarker}
                        />

                    </div>
                ))}
                {activePopup &&
                    <Popup position={[
                        activePopup.taskLatitude,
                        activePopup.taskLongitude
                    ]}
                        onClose={() => {
                            setActivePopup(null)
                        }}
                    >
                        <div>
                            <div className='popupTitle'>
                                <h2>{activePopup.taskCategory}</h2>
                                <p>{activePopup.taskPrice}</p>
                            </div>


                            <div> {activePopup.taskDescription ? <p>{activePopup.taskDescription.substring(0, 100)}<span> ...Vise u Detaljima</span></p> : null}</div>
                            <button>detaljnije</button>

                        </div>
                    </Popup>
                }
            </Map>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        tasks: state.globalReducer.tasks

    }
}

export default connect(mapStateToProps, null)(MapComponent)