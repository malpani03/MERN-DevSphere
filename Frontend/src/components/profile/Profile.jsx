import PropTypes from 'prop-types'
import { Fragment, useEffect } from 'react'
import {connect} from 'react-redux'
import {getProfileById} from '../../actions/profile'
import { useParams,Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'


const Profile =({getProfileById,profile:{profile,loading},auth,match})=> {
    const { id } = useParams();
    useEffect(()=>{ 
        getProfileById(id);
    },[getProfileById]);
  return(
    <section className='container'>
        {profile === null || loading ? <Spinner/> :
        <Fragment>
          <Link to='/profiles' className="btn btn-light">
            Back to Profiles
            </Link>  
            {
                auth.isAuthenticated && auth.loading ===false && auth.user._id ===profile.user._id && (<Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>)
            }
            <div className='profile-grid my-1'>
                <ProfileTop profile={profile}/>
                <ProfileAbout profile={profile}/>
                <div className='profile-exp bg-white p-2'>
                <h2 className="text-primary">Experience</h2>
                {profile.experience.length > 0 ?(
                    <Fragment>
                        {profile.experience.map(experience=>(
                            <ProfileExperience key={experience._id}
                            experience={experience}
                            />  
                        ))}
                    </Fragment>
                ):(<h4>No Experience Credentials</h4>)}
                </div>

                <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>

            {profile.githubusername && (
                <ProfileGithub username={profile.githubusername}/>
            )}
            </div>
        </Fragment>}
    </section>
  )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
}

const mapStateToProps=(state)=>({
    profile: state.profile,
    loading: state.profile.loading,
    auth:state.auth
})

export default connect(mapStateToProps,{getProfileById})(Profile)
