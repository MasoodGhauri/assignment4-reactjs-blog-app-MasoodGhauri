import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useUserLoggedIn } from "../hooks/useUserLoggedIn";

function CreateNew() {
    const [errorMsg, setErrorMsg] = useState(null);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [catagories, setCatagories] = useState([]);
  
  const useUserHook = useUserLoggedIn();

  const handleClose = () => {
    if(title===''||body===''){
        setErrorMsg("Both title and body are required");
        setTimeout(() => {
            setErrorMsg(false);
        }, 4000);
    }
    else{
        let payload={
            Title:title,
            Body:body,
        }
        if(keywords.length>0)
            payload.Keywords=keywords;
        if(catagories.length>0)
            payload.Catagories=catagories;

        // console.log(title,body,keywords, catagories);
        fetch(process.env.REACT_APP_BASE_URL + "/blog/new", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: useUserHook.token,
            },
            body: JSON.stringify(payload),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            //   setShow(!show);
              if (data.Success === true) {
            //     setSuccessMsg(data.Message);
            //     setErrorMsg(null);
            //     setTimeout(() => setSuccessMsg(null), 2000);
            //     removeBlog(blog._id);
                setShow(!show);
              } else {
                setErrorMsg("Session expired! Login Again");
              }
            })
            .catch((err) => setErrorMsg("Something went wrong! try again"));
        
    }
    
    }
  const handleShow = () => setShow(!show);

  const addKeywords=(e)=>{
    let str=e.target.value;
    let hashtagged = '#' + str.replace(/,/g, ',#');
    setKeywords(hashtagged.split(','));
  }
  const addCatagories=(e)=>{
    let str=e.target.value;
    setCatagories(str.split(','));
  }

  return (
    <>
      <Button className='createNew' onClick={handleShow}>
        Create new Blog
      </Button>

      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Create new Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          {errorMsg && <p className="error">{errorMsg}</p>}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="my first blog"
                onChange={(e)=>setTitle(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Body</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={(e)=>setBody(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Keywords</Form.Label>
              <Form.Control
                type="text"
                placeholder="comma seperated"
                onChange={(e)=>addKeywords(e)}
                autoFocus
              />
            </Form.Group>
            <div className='list'>
                {keywords.length>0 && keywords.map((k, i)=>{
                    return (<p key={i} className='keyword'>{k}</p>)
                })}
            </div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Catagories</Form.Label>
              <Form.Control
                type="text"
                placeholder="comma seperated"
                onChange={(e)=>addCatagories(e)}
                autoFocus
              />
            </Form.Group>
            <div className='list'>
                {catagories.length>0 && catagories.map((c, i)=>{
                    return (<p key={i} className='catagory'>{c}</p>)
                })}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateNew;