import React, { Component }from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import {  LocalForm, Control, Errors} from 'react-redux-form'

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);



function RenderCampsite({campsite}){
    return(
        <div  className={'col-md-5 m-1'}>
            <Card>
                <CardImg top src={campsite.image} alt= {campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}
function RenderComments({comments}){
    if(comments){
        return(
            <div className={'col-md-5 m-1'}> 
                <h4>Comments</h4> 
                {comments.map(comments =>
                <div key={comments.id}>{comments.text}<br />
                <p>--{comments.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</p>
                </div>)}
                <CommentForm />
            </div>
        )
    }
}

class CommentForm extends Component {
    constructor(props)  {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(){
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }


    handleSubmit(values){
     console.log("Current state is: " + JSON.stringify(values));
     alert("Current state is: " + JSON.stringify(values));
    }

    render() {
        return(
            <React.Fragment>
                <Button outline className="fa-lg" onClick={this.toggleModal}>
                    Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                           <div className='form-group'>
                               <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating"
                                            className="form-control" id="rating">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                </Control.select>
                           </div>
                           <div className='form-group'>
                               <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" name="author"
                                            className="form-control" id="author" 
                                            validators={{
                                                
                                                minLength: minLength(2),
                                                maxLength: maxLength(15)
                                            }}/>
                                            <Errors 
                                                className="text-danger"
                                                model=".author"
                                                show="touched"
                                                component="div"
                                                messages={{
                                                    minLength: 'Must be at least 2 characters',
                                                    maxLength: 'Must be 15 characters or less'
                                            }}/>
                               
                           </div>
                           <div className='form-group'>
                               <Label htmlFor="text">Comments</Label>
                                <Control.textarea rows='6' model=".text" name="text"
                                            className="form-control" id="text">
                                        
                                </Control.textarea>
                           </div>
                           <Button type="submit">Submit</Button>

                        </LocalForm>

                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }

}
function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                    <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>

                <div className="row">

                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />                
                </div>
            </div>
        );
    }
    return <div />;
}





export default CampsiteInfo