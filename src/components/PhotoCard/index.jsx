import React, { Component } from 'react'
import './index.scss'
import Modal from 'react-responsive-modal';

class PhotoCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: false,
      deleteModal: false
    }

    this.openModal = this.openModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }


  openModal(type) {
    this.setState({[type]: true})
  }


  onCloseModal(type) {
    this.setState({[type]: false})    
  }

  render () {
    const { photo, onDelete } = this.props;
    const { comment, deleteModal } = this.state;
    return (<div className="photocard-item" onClick={() => {this.props.onLike(photo.id)}}>
      {!photo.uploadedByMe && <img src={photo.Image} alt=""></img>}
      {photo.uploadedByMe && <img src={photo.imagestring} alt=""></img>}
      <div className="action-menus">
        <span><i className="fa fa-thumbs-up"></i><span className="likes">{photo.likes}</span></span>
        <span className="comment-icon" onClick={() => this.openModal('comment')}><i className="fa fa-comment"></i></span>
        <span><i className="fa fa-trash" onClick={() => this.openModal('deleteModal')}></i></span>
      </div>
      
      {comment && <Modal open={comment} showCloseIcon={false} onClose={() => {this.onCloseModal('comment')}}>
          <h2>This Modal is for comment, but not implemented due to timeconstraint</h2>
        </Modal>
      }
      
      {deleteModal && <Modal open={deleteModal} showCloseIcon={!photo.uploadedByMe} onClose={() => {this.onCloseModal('deleteModal')}}>
        { photo.uploadedByMe && (<div><h2>Are you sure to delete this photo?</h2>
          <button onClick={() => { this.onCloseModal('deleteModal');onDelete(photo.id)}}>Yes</button></div>
        )}
        { !photo.uploadedByMe && (<h2>You cannot delete this photo as it is not uploaded by you</h2>
        )}
        </Modal>
      }
    </div>)
  }
}
export default PhotoCard
