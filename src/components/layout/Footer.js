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
                        {/* <ul className="footerMenuUl">
                            <li><Link to='/' className="footerMenuLi">Pocetna </Link></li>
                            <li><Link to='/tasks' className="footerMenuLi">Taskovi </Link></li>
                            <li><Link to='/services' className="footerMenuLi">Servisi </Link></li>
                            <li><Link to='/UserDashboard' className="footerMenuLi">Profil </Link></li>


                        </ul> */}
                        <img className="footerLogoImage" src="/images/zanatlijeLogo2.png" alt="" />
                    </div>
                    <div className="footerMenuItem footerAboutMe">
                        <p>Sajt ,,Zanatlije’’ predstavlja platformu pomoću koje možete brzo i jednostavno da pronađete osobu u vašem okruženju koja vam može pomoći oko sitnica koje život znače: od majstora, frizera, preko čuvara životnija; kao i mesto na kome možete da pronađete kratoročni posao u okviru vaših sposobnosti.</p>
                        <p>Sve to na jednom mestu, bez posrednika: svaku dalju komunikaciju vodite sami.
</p>
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
