      import { useState,useCallback  } from 'react'
      import { useDropzone } from 'react-dropzone';
      import  logo from '../public/assets/images/logo-full.svg'
      import upload from '../public/assets/images/icon-upload.svg'
      import uploadAlert from '../public/assets/images/icon-info.svg'
      import ticket from '../public/assets/images/pattern-ticket.svg'
      import logoMark from '../public/assets/images/logo-mark.svg'
      import git from '../public/assets/images/icon-github.svg'
      import { ToastContainer, toast } from 'react-toastify';
      import 'react-toastify/dist/ReactToastify.css';


      
      function App() {
        const [fullName, setFullname] = useState("")
        const [email, setEmail] = useState("")
        const [github, setGithub] = useState("")
        const [image, setImage] = useState(null);
        const [error, setError] = useState('');
        const [showOutput, setShowOutput] = useState(false);
        const [emailError,setEmailError] = useState("")
        const [gitError,setGitError] = useState("")
        const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const githubValidation = /^@(?!-)[a-zA-Z\d-]{1,39}(?<!-)$/

        const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
          if (file.size > 500 * 1024) {
            setError('File too long. Please uplaod a photo under 500KB');
            setImage(null);
            return;
          }
          setImage(Object.assign(file, {
            preview: URL.createObjectURL(file),
          }));
          setError('');

        }
      }, []);

      const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        accept: {
          'image/jpeg': [],
          'image/png': [],
        },
        maxFiles: 1,
        noClick: true,
        noKeyboard: true,
      });

      function handleNameChange(e) {
        setFullname(e.target.value);
            }

      function handleEmailChange(e) {
        setEmail( e.target.value);
      }
      function handleGithubChange(e) {
          setGithub(e.target.value);
        }

        function generateTicket(e) {
        e.preventDefault();
        if (!image ||!fullName) {
            toast.error("Please, fill all fields to submit the form");
          return;
        }
      
        else if (!email || !email.match(emailValidation)) {
          setEmailError('Please enter a vaild Email Address'); 
          document.body.classList.add("error") 
          return;
        }
        else if (!github || !github.match(githubValidation)) {
          setGitError('Please enter a vaild GitHub user name'); 
          document.body.classList.add("error") 
          return;
        }

    
        setEmailError(""); 
        setGitError(""); 
        setShowOutput(true);
      }

      function removeImage() {
        setImage(null);
        setError('');
      }
        
        return (
          <>
          {/* logo */}
          <div className='text-center m-5'>
            <img src={logo} alt="Logo" />
          </div>

          {/* Input Screen */}
          {!showOutput && (
          <div id='Input'>
          <div className='m-2 text-center '>
            <h1 className='text-white'>Your Journey to Coding Conf <br/> 2025 Starts Here!</h1>
            <p className='text-white-50 fs-5'>Secure your spot at next year's biggest coding conference. </p>
          </div>
          <div className='d-flex align-items-center justify-content-center'>
            <form onSubmit={generateTicket}>

              <label>Upload Avatar</label>
              <div {...getRootProps()} className={`upload p-3 mt-2 text-center ${!image ? 'no-image' : ''}`}  >
                    <input {...getInputProps()} />
                    {/* Incase the user didn't upload image yet */}
                    {!image ? (
                      <div>
                        <img src={upload} alt="Upload" className='p-2 mb-3' />
                        <p className='text-light mb-0' onClick={open}>Drag and drop or click to upload</p>
                      </div>) 
                      : 
                      (
                      <>
                        <img src={image.preview} alt="Preview" className='user-image'/>
                        <div className='mt-2'>
                          <button type="button" className='btn images  m-2' onClick={removeImage}>Remove Image</button>
                          <button type="button" className='btn  images m-2' onClick={open}>Change Image</button>
                        </div>
                      
                        </>)

              
                    }
                  </div>
                  
                    <div className='mt-2'>
                            <img src={uploadAlert} alt="upload alert" className='pe-2' />
                            <small className= {`  ${error === "File too long. Please uplaod a photo under 500KB" ? 'error': 'upload-sucess'}`} >
                              {error !=="File too long. Please uplaod a photo under 500KB" ?
                                "Upload your photo (JPG or PNG, max size: 5MB)": "File too long. Please uplaod a photo under 500KB" }.</small>
                            </div>

              <label className='mt-3'>Full Name</label>
              <input type="text"  onChange={handleNameChange}/>

              <label>Email Address</label>
              <input type="text" placeholder='example@email.com' className='input-email' onChange={handleEmailChange} />
              {emailError && (<div className='mt-0 mb-3'>
                              <img src={uploadAlert} alt="Icon info" />  
                              <small className="error"> {emailError} </small>
                                </div>

                              )}

            

              <label> GitHub Username</label>
              <input type="text" placeholder='@yourusername ' className='input-git' onChange={handleGithubChange} />
               {gitError && (<div className='mt-0 mb-3'>
                              <img src={uploadAlert} alt="Icon info" />  
                              <small className="error"> {gitError} </small>
                                </div>

                              )}
              
              
              <button className='btn  btn-main   w-100 mb-5 'type="submit"  onClick={generateTicket}>Generate My Ticket</button>
              
              </form>
            </div>
          </div>)}


            {/* Output Ticket */}
              {showOutput && (
            <div id='Output' className='text-center'>
              <h1 className='text-white fw-bold'>Congrats, <span className='output-name'>{fullName}!</span> <br/> Your ticket is ready.</h1>
              <p className='fs-4 mt-4  m-auto text-white mb-5'>We've emailed your ticket to <br/>
                  <span className='output-email'>{email} </span>
                  and will send updates in the run up to the event.</p>

              <div className='ticket position-relative d-inline-block'>
                <img src={ticket} alt="Ticket" className='img-fluid'  />
                <div className=' position-absolute  mt-4 top-0 start-0 m-4  text-center text-white'>
                <img className='me-4' src={logoMark} alt= "LogoMark" />
                <h2 className='d-inline fw-bolder fs-1'>Coding Conf</h2>
                <p className='ms-5 mt-1 text-white-50 '>Jan 31, 2025 / Austin, TX</p>
                </div>


                <div className='info position-absolute top-50 start-0  m-4  text-white'>
                  <div className='d-flex  justify-content-start align-items-start gap-3'>
                  <div className='avatar'>
                    {image && <img src={image.preview} className='img-fluid '  alt="Avatar"  />}
                  </div>
                  <div className='ms-2'>
                    <small className='fs-4 mb-0 d-block text-start'>{fullName}</small>
                      <div className='d-flex justify-content-center align-items-center gap-2'>
                      <img src={git} alt="GitHub"  className='img-fluid'  style={{ width: '20px' }} />
                    <p className='mb-0'>{github}</p>
                  </div>
                  </div>
                  </div>
                  </div>
                  <div className=' number position-absolute mt-5 m-4  text-white'>
                      <small className='text-white-50 fs-1'>#01609</small>
                  </div>
                </div>
              </div>
          )}
          
          <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                />
          </>
        )
      }

      export default App
