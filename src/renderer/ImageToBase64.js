import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faDownload } from '@fortawesome/free-solid-svg-icons';
import LeftNavMenu from '../components/LeftNavMenu';
import TopBarTitle from '../components/TopBarTitle';

function ImageToBase64() {
  const [isCoppied, setIsCoppied] = useState(false);
  const [base64ImageData, setBase64ImageData] = useState();
  const [imageName, setImageName] = useState();
  const [errorClass, setErrorClass] = useState('');
  const fileInputRef = useRef();
  const preview = document.getElementById('image-preview');
  // const getBase64StringFromDataURL = (dataURL) =>
  //   dataURL.replace('data:', '').replace(/^.+,/, '');
  useEffect(() => {
    // Function to be called after rendering
    if (base64ImageData) {
      try {
        preview.src = base64ImageData;
      } catch (err) {
        console.log(err);
      }
    }
  }, [base64ImageData, preview]);

  const handleChange = (e) => {
    const { files } = e.target;
    if (!files || !files[0]) {
      return;
    }
    const file = files[0];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(file.name)) {
      setImageName('');
      setBase64ImageData('');
      setErrorClass('error');
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const result = fileReader.result || '';
      if (result !== '' || result !== null) {
        setBase64ImageData(result);
        setImageName(file.name);
        setErrorClass('');
      }
    };

    fileReader.onerror = (error) => {
      setImageName('');
      setBase64ImageData('');
      setErrorClass('error');
    };
    fileReader.readAsDataURL(file);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(base64ImageData);
    setIsCoppied(true);
    setTimeout(() => {
      setIsCoppied(false);
    }, 800);
  };
  const handleDownload = () => {
    const anchor = document.createElement('a');
    anchor.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(base64ImageData));
    anchor.download = `${imageName}.txt`;
    anchor.click();
  };
  return (
    <div>
      <div className="flex-container">
        <LeftNavMenu currentPage="ImageToBase64" />
        <div className="App-Body Backgound-Grey">
          <TopBarTitle title='Base64 Image Encoder' introduce='Convert any image file to Base64 or Data URL' />
          <div className="Result Backgound-Grey padding-20 Base64-Result">
            <div className="flex-container-vertical">
              <div className='flex-item'>
                <label for="images" className={`drop-container drop-container-image ${errorClass}`}>
                  <span className="drop-title">Drop image here</span>
                  <br/>or<br/>
                  <input ref={fileInputRef} onChange={handleChange} type="file" accept="image/*" required />
                </label>
              </div>
              <div className='flex-item'>
                <div className="flex-container">
                  <div className='flex-item'>
                    <div className="form-group">
                      {base64ImageData && (<span className='small-text'>DataURL</span>)}
                      {base64ImageData && (
                        <button onClick={handleCopy} type="button" className="btn btn-copy">
                          <FontAwesomeIcon
                            style={{ width: '12px' }}
                            icon={faCopy}
                          />
                          {isCoppied ? ' Coppied' : ' Copy'}
                        </button>
                      )}
                      {base64ImageData && (
                        <button onClick={handleDownload} type="button" className="btn btn-copy">
                          <FontAwesomeIcon
                            style={{ width: '12px' }}
                            icon={faDownload}
                          />
                          {' Save as text'}
                        </button>
                      )}
                      {base64ImageData && (<textarea rows={15} className='textarea-base64-value form-control' value={base64ImageData} />)}
                    </div>
                  </div>
                  <div className='flex-item'>
                    <div className={`preview`}>
                      {errorClass === '' && (
                        <img id={`image-preview`} className={`${base64ImageData ? 'has-image' : 'no-image'}`} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageToBase64;
