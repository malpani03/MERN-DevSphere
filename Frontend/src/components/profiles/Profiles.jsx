import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useState } from 'react'
import Spinner from '../layout/Spinner'
import {getProfiles} from '../../actions/profile'
import { useEffect } from 'react'
import ProfileItem from './ProfileItem'

const Profiles =({getProfiles,profile:{profiles,loading}})=> {
    useEffect(()=>{
        getProfiles();
    },[getProfiles]);
  return <section className='container'>
      {loading ? <Spinner/> : <>
      <h1 className='large text-primary'>Developers</h1>
      <p className='lead'>Browse and connect with Developers</p>
      <div className='profiles'>
        {profiles.length > 0 ? (
            profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
            ))
        ) : <h4>No profiles found...</h4>}
      </div>
      </>}
    </section>;
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps=state=>({
    profile:state.profile,
    loading:state.profile.loading
})

export default connect(mapStateToProps,{getProfiles})(Profiles)
