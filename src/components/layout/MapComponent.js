import React, { useState } from 'react';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { FiClock, FiTag } from "react-icons/fi";
// FiHeart, FiSearch, FiTag, FiKey,FiCheckCircle,FiMapPin, FiUsers,FiClock,
// import { Icon } from 'leaflet';

import { FaMoneyBill } from "react-icons/fa";
import { connect } from 'react-redux'
// const iconMarker = new Icon({
//     iconUrl: "/marker2.svg",
//     iconSize: [40, 40]
// })
function MapComponent(props) {
    const [activePopup, setActivePopup] = useState(null);
    let tasks = props.tasks
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
                        <div className='mapPopupWrapper'>
                            <div className="mapPopupContent">
                                <div className="mapPopupTitle">
                                    <h2>{activePopup.taskTitle}</h2>
                                </div>
                                <div className="mapPopupInfo">
                                    <div className="mapPopupInfoItem">
                                        <FiTag className="mapPopupInfoIconTag" />
                                        <p>{activePopup.taskCategory}</p>
                                    </div>
                                    <div className="mapPopupInfoItem">
                                        <FaMoneyBill className="mapPopupInfoIconPrice" />
                                        <p>{activePopup.taskPrice}</p>
                                    </div>
                                    <div className="mapPopupInfoItem">
                                        <FiClock className="mapPopupInfoIconTime" />
                                        <p>{activePopup.taskStartDate}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='mapPopupDescription'> {activePopup.taskDescription ? <p>{activePopup.taskDescription.substring(0, 100)}<span> ...</span></p> : null}</div>
                            <p className='mapPopupBTN'>Detaljnije</p>
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