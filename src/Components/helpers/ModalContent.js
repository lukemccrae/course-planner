import Button from '@material-ui/core/Button';

export const DeleteModalContent = (props) => {
    return (
        <div>
            <h5 style={{margin: '0 10px 10px 0'}}>
            Are you sure?
            </h5>
            <Button style={{margin: '0 0 0 10px'}} disabled={props.courseList.length < 2} variant="outlined" className="five-px-margin-right"  onClick={props.deleteCourse}>Delete</Button>
            <Button style={{margin: '0 0 0 10px'}} variant="outlined" className="five-px-margin-right" onClick={props.updateDeleteModalIsOpen}>Cancel</Button>
          </div>
    )
}