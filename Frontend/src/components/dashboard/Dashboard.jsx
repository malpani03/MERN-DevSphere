import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { useEffect } from "react";
import { IoPerson } from "react-icons/io5";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { MdOutlineDeleteSweep } from "react-icons/md";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <section className="container">
    <div className="">
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <IoPerson />
            Welcome {user && user.name}
          </p>
          {profile !== null ? (
            <div className="row">
              <div className="col-md-6">
                <DashboardActions />
              </div>
              <div className="col-md-6">
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
                <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <MdOutlineDeleteSweep/> Delete My Account
            </button>
          </div>
              </div>
            </div>
          ) : (
            <>
              <p>You have not yet set up a profile, please add some info</p>
              <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
              </Link>
            </>
          )}
        </>
      )}
    </div>
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
