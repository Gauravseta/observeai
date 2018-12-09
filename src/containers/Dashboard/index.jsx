import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadPhotosAction, addPhotoAction, deletePhotoAction, likePhotoAction } from '../../models/Dashboard';
import PhotoCard  from '../../components/PhotoCard';
import  uuidv1 from 'uuid/v1';

import './index.scss'
class DashboardComponent extends Component {

    componentDidMount () {
        this.props.loadPhotos();

        this.onLike = this.onLike.bind(this);
        this.readFile = this.readFile.bind(this);
        this.onDeletePhoto = this.onDeletePhoto.bind(this);
    }

    readFile(event) {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.props.addPhoto({
                    id: uuidv1(),
                    uploadedByMe: true,
                    imagestring: e.target.result,
                    likes: 0
                });
                e.target.files = null;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    onLike(id) {
        //Could not implement due to time cosntraint
    }

    //Delete photo by id from storage
    onDeletePhoto(id) {
        this.props.deletePhoto(id);
    }

    render () {
        const { photos } = this.props;
        return (<div className="dashboard-container">
            <div className="profile-section">
                <span className="photo-txt">Photos</span>
                <input type="file" className="photo-btn" accept="image/*" onChange={(event)=> {this.readFile(event)}}></input>
            </div>

            <div className="photocard-section">
            {
                photos.map((item, i) => 
                (<PhotoCard photo={item} key={i} onDelete={(id) => {this.onDeletePhoto(id)}} onLike={(id) => {this.onLike(id)}}></PhotoCard>)
                )
            }
            </div>
        </div>)
    }
}

const mapStateToProps = state => {
    return {
        photos: state.dashboard.photos,
        comments: state.dashboard.comments,
        likes: state.dashboard.likes,
        likedByMe: state.dashboard.likedByMe
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadPhotos: () => dispatch(loadPhotosAction()),
        addPhoto: (photo) => dispatch(addPhotoAction(photo)),
        deletePhoto: (id) => dispatch(deletePhotoAction(id)),
        likePhoto: (id) => dispatch(likePhotoAction(id))
    }
}

const Dashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardComponent)

export default Dashboard