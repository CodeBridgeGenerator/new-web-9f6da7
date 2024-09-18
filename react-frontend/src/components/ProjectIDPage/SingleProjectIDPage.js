import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";

import ProjectNamePage from "../ProjectNamePage/ProjectNamePage";

const SingleProjectIDPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [Username, setUsername] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("projectID")
            .get(urlParams.singleProjectIDId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"Username"] }})
            .then((res) => {
                set_entity(res || {});
                const Username = Array.isArray(res.Username)
            ? res.Username.map((elem) => ({ _id: elem._id, Username: elem.Username }))
            : res.Username
                ? [{ _id: res.Username._id, Username: res.Username.Username }]
                : [];
        setUsername(Username);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "ProjectID", type: "error", message: error.message || "Failed get projectID" });
            });
    }, [props,urlParams.singleProjectIDId]);


    const goBack = () => {
        navigate("/projectID");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">ProjectID</h3>
                </div>
                <p>projectID/{urlParams.singleProjectIDId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Name </label><p className="m-0 ml-3" >{_entity?.name}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Username</label>
                    {Username.map((elem) => (
                        <Link key={elem._id} to={`/projectID/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.Username}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="created By:"></Tag>
                        <p className="m-0 ml-3">{_entity?.createdBy?.name}</p>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="created At:"></Tag>
                        <p className="m-0 ml-3">{moment(_entity?.createdAt).fromNow()}</p>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="last Updated By:"></Tag>
                        <p className="m-0 ml-3">{_entity?.updatedBy?.name}</p>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="updated At:"></Tag>
                        <p className="m-0 ml-3">{moment(_entity?.updatedAt).fromNow()}</p>
                    </div>
                </div>
            </div>
        </div>
        <ProjectNamePage/>
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleProjectIDPage);
