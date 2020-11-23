import React, { useState } from 'react';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
// import { Icon } from 'leaflet';
import { fakeMapData } from '../mapData.json';
// const iconMarker = new Icon({
//     iconUrl: "/marker2.svg",
//     iconSize: [40, 40]
// })
function MapComponent() {
    const [activePopup, setActivePopup] = useState(null);


    return (
        <div className='map'>


            <Map center={[44.82081203, 20.41482925]} zoom={12}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {fakeMapData.map((item) => (
                    <div key={item.id}>
                        <Marker position={[
                            item.location[0],
                            item.location[1]
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
                        activePopup.location[0],
                        activePopup.location[1]
                    ]}
                        onClose={() => {
                            setActivePopup(null)
                        }}
                    >
                        <div>
                            <div className='popupTitle'>
                                <h2>{activePopup.category}</h2>
                                <p>{activePopup.price}</p>
                            </div>

                            <p>{activePopup.description}</p>
                            <p>{activePopup.phoneNumber}</p>

                        </div>
                    </Popup>
                }
            </Map>
        </div>
    );
}

export default MapComponent;
