import React from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import * as actionCreator from '../../../../store/actions/actions'
import { connect } from 'react-redux'

function UserServices(props) {
    let myServices = props.myServices;

    return (
        <div className="dashServicesWrapper">
            <p className="dashServicesTitle">Usluge Koje Nudim</p>
            <hr />
            {myServices && myServices.map((item) => (
                <div className="dashServicesCard" key={item.service_ID}>
                    <div className="dashServicesCardCategory">
                        <h3>Kategorija: {item.serviceCategory}</h3>
                        <h5>Cena:  <span>{item.servicePrice === 0 ? 'Dogovor' : item.servicePrice}</span>  </h5>
                        <p>{item.serviceDescription}</p>
                    </div>
                    <div className="dashServicesAction">
                        <p onClick={() => {
                            props.deleteService(item.service_ID);
                        }}><DeleteForeverIcon className="dashServicesActionIcon" /></p>
                    </div>
                </div>
            ))}


        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        myServices: state.User.myServices
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteService: (id) => dispatch(actionCreator.deleteService(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserServices);
