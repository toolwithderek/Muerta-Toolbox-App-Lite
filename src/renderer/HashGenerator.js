import React, { useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faArrowRight, faPlay } from '@fortawesome/free-solid-svg-icons';
import { hashGenerator } from 'ultils/helpers';

import LeftNavMenu from '../components/LeftNavMenu';
import TopBarTitle from '../components/TopBarTitle';

function HashGenerator() {
  const [originalInput, setOriginalinput] = useState('');
  const [hashData, setHashData] = useState([]);

  const handleOnchangeInput = (event) => {
    const inputString = event.target.value;
    setOriginalinput(inputString);
  };

  const handleGenerateHash = async () => {
    const newHashData = [];
    const hashMD5 = await hashGenerator('MD5', originalInput);
    const hashSHA1 = await hashGenerator('SHA-1', originalInput);
    // const hashSHA224 = await hashGenerator('SHA-224', originalInput);
    const hashSHA256 = await hashGenerator('SHA-256', originalInput);
    const hashSHA384 = await hashGenerator('SHA-384', originalInput);
    const hashSHA512 = await hashGenerator('SHA-512', originalInput);
    newHashData.push({ name: 'MD5', value: hashMD5 });
    newHashData.push({ name: 'SHA-1', value: hashSHA1 });
    // newHashData.push({ name: 'SHA-224', value: hashSHA224 });
    newHashData.push({ name: 'SHA-256', value: hashSHA256 });
    newHashData.push({ name: 'SHA-384', value: hashSHA384 });
    newHashData.push({ name: 'SHA-512', value: hashSHA512 });
    console.log(newHashData);
    setHashData(newHashData);
  };
  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div>
      <div className="flex-container">
        <LeftNavMenu currentPage="HashGenerator" />
        <div className="App-Body Backgound-Grey">
          <TopBarTitle title='Hash Generator' />
          <div className="Result Backgound-Grey padding-20 Base64-Result">
            <div className="flex-container-vertical">
              <div className="flex-container">
                <div className='flex-item left-item'>
                  <div className="button-actions text-right">
                    {/* <span className="small-text">Input String</span> */}
                    <button disabled={!originalInput} style={{color: 'white'}} onClick={handleGenerateHash} type="button" className="btn btn-primary">
                      Convert{` `}
                      <FontAwesomeIcon
                        style={{ width: '18px' }}
                        icon={faPlay}
                      />
                    </button>
                  </div>
                </div>
                <div className='flex-item right-item'>
                  <div className='flex-item item-actions'>
                    <div className="button-actions">
                      {/* <span className="small-text">Output</span> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-container">
                <div className='flex-item left-item padding-right-5' style={{paddingTop: '5px'}}>
                  <CodeEditor
                    value={originalInput}
                    placeholder="Enter your string"
                    onChange={handleOnchangeInput}
                    style={{
                      fontSize: 13,
                      backgroundColor: 'white',
                      height: '50vh',
                      border: '1px solid rgb(221, 221, 221)',
                    }}
                  />
                </div>
                <div className='flex-item right-item padding-left-5'>
                  {hashData.map((item) => {
                    return (<div>
                      <span>{item.name}</span>
                      <div className="input-group mb-3">
                        <input disabled={true} type='text' value={item.value} type="text" className="form-control custom-input-group" />
                        <div class="input-group-append">
                          <button data-value={item.value} onClick={() => handleCopy(item.value)} className="btn btn-outline-secondary" type="button">
                            <FontAwesomeIcon
                              icon={faCopy}
                            />
                          </button>
                        </div>
                      </div>
                    </div>)
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HashGenerator;
