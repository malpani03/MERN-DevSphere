import { Link } from "react-router-dom";
import { IoSchoolSharp } from "react-icons/io5";
import { MdAddBox } from "react-icons/md";
import { IoPerson } from "react-icons/io5";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light dash-btn">
        <IoPerson/> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light dash-btn">
        <MdAddBox/> Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light dash-btn">
      <IoSchoolSharp /> Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
