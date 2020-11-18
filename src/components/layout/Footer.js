import React from 'react';
import { Link } from 'react-router-dom'
import { GrFacebook } from "react-icons/gr";
import { GrInstagram } from "react-icons/gr";
import { GrTwitter } from "react-icons/gr";
function Footer() {
    return (
        <div className="footerWrapper footer">
            <div className="footerContent">
                <div className="footerContentItems">
                    <div className="footerMenuItem">
                        <ul className="footerMenuUl">
                            <li><Link to='/' className="footerMenuLi">Pocetna </Link></li>
                            <li><Link to='/tasks' className="footerMenuLi">Taskovi </Link></li>
                            <li><Link to='/services' className="footerMenuLi">Servisi </Link></li>
                            <li><Link to='/UserDashboard' className="footerMenuLi">Profil </Link></li>


                        </ul>
                    </div>
                    <div className="footerMenuItem footerAboutMe">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                    <div className="footerMenuItem footerIcons">
                        <a href='www.twitter.com'> <GrFacebook className="footerIcon facebook" /></a>
                        <Link to='www.twitter.com'> <GrInstagram className="footerIcon instagram" /></Link>
                        <Link to='www.twitter.com'> <GrTwitter className="footerIcon twitter" /></Link>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
