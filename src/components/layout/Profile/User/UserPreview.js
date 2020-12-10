import React from 'react';
import { connect } from 'react-redux';
import { IoLogoLinkedin, IoLogoFacebook, IoLogoInstagram } from "react-icons/io";
function UserPreview(props) {
    let user = props.authUser;
    let myServices = props.myServices;
    return (
        <div className='userPreviewWrapper'>
            <div className="userPreviewContent">
                <div className="userPreviewAvatarNameBox">
                    <div className='userPreviewAvatar'>
                        {user.avatar ? <img src={`http://localhost:3001/uploads/${user.avatar}`} alt="profile" className='userPreviewImage' /> : <img src="./images/zanatlija.png" className='userPreviewImage' alt="profile" />}
                    </div>
                    <div className="userPreviewName">
                        <h2>{user.firstName}</h2>
                    </div>
                </div>
                <div className="userPreviewInformationWrapper">
                    <div className="userPreviewInfoContent">
                        <div className='userPreviewContact '>
                            <div className="userPreviewContactTitle">
                                <h4>Kontakt</h4>
                            </div>
                            <div className="userPreviewContactPhone userPreviewInfoContentItem">
                                <p>Telefon: <span>{user.phoneNumber}</span></p>
                            </div>
                            <div className="userPreviewContactEmail userPreviewInfoContentItem">
                                <p>Email: <span>{user.email}</span></p>
                            </div>
                            <div className="userPreviewContactAddress userPreviewInfoContentItem">
                                <p>Adresa: <span>{user.address}</span></p>
                            </div>
                            {user.userFacebook && <div className="userPreviewContactFacebook">
                                <IoLogoFacebook onClick={() => {
                                    window.location.href = "http://www.facebook.com";
                                }} />
                            </div>}
                            {user.userInstagram && <div className="userPreviewContactInstagram">
                                <IoLogoInstagram onClick={() => {
                                    window.location.href = "http://www.instagram.com";
                                }} />
                            </div>}
                            {user.userLinkedin && <div className="userPreviewContactLinkedIn">
                                <IoLogoLinkedin onClick={() => {
                                    window.location.href = "http://www.linkedin.com";
                                }} />
                            </div>}
                        </div>
                        <div className='userPreviewAboutMe '>
                            <h4>O meni</h4>
                            <p>{user.aboutMe}</p>
                        </div>
                    </div>
                </div>
                <div className="userPreviewServicesWrapper">
                    <div className="userPreviewServicesContent">
                        <div className="userPreviewServicesTitle">
                            <h4>Moje usluge</h4>
                        </div>
                        <div className="userPreviewServicesCardWrapper">
                            {myServices.length ? myServices.map((item) => (
                                <div className="userPreviewServicesCard" key={item.service_ID}>
                                    <div className="userPreviewServicesCardCategory">
                                        <h4>{item.serviceCategory}</h4>
                                    </div>
                                    <div className="userPreviewServicesCardPrice">
                                        <p>{item.servicePrice}</p>
                                    </div>
                                    <div className="userPreviewServicesCardDescription">
                                        <p>{item.serviceDescription}</p>
                                    </div>
                                </div>
                            )) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        authUser: state.User.authUser,
        myServices: state.User.myServices
    }
}
export default connect(mapStateToProps, null)(UserPreview);
