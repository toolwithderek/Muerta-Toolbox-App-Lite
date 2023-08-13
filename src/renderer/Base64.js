import React, { useState } from 'react';
import { encode, decode } from 'js-base64';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import Toggle from 'react-toggle';

import LeftNavMenu from '../components/LeftNavMenu';
import TopBarTitle from '../components/TopBarTitle';

function Base64() {
  const [originalInput, setOriginalinput] = useState(null);
  const [stringOutput, setStringOutput] = useState('');
  const [isEncoded, setIsEncoded] = useState(true);
  const [error, setError] = useState();

  const handleOnchangeInput = (event) => {
    let inputString = event.target.value;
    setOriginalinput(inputString);
    try {
      if (isEncoded) {
        inputString = encode(inputString);
      } else {
        inputString = decode(inputString);
      }
      setStringOutput(inputString);
    } catch (err) {
      setError(err);
    }
  };
  const handleToogle = (event) => {
    const currentValue = event.target.checked;
    let outputString = '';
    try {
      if (currentValue) {
        outputString = encode(originalInput);
      } else {
        outputString = decode(originalInput);
      }
      setIsEncoded(currentValue);
      setStringOutput(outputString);
    } catch (err) {
      setError(err);
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(stringOutput);
  };
  return (
    <div>
      <div className="flex-container">
        <LeftNavMenu currentPage="Base64" />
        <div className="App-Body">
        <TopBarTitle title='Base64 Encode / Decode' />
          <div className="Result Backgound-Gray padding-20 Base64-Result">
            <div className="flex-container-vertical">
              <div className='flex-item item-actions'>
                <div className="button-actions">
                  <Toggle disabled={originalInput == null || originalInput === '' } id="encode-tootgle" defaultChecked={isEncoded} onChange={handleToogle} />
                  {/* <button type="button" className="btn">
                    <FontAwesomeIcon
                      style={{ width: '12px' }}
                      icon={faCopy}
                    />
                    {` `}Copy
                  </button> */}
                  {error && (
                    <div className="alert alert-danger" role="alert">{ error }</div>
                  )}
                </div>
              </div>
              <div className='flex-item item-full'>
                <textarea
                  rows="8"
                  className="full-width"
                  placeholder="Input"
                  value={originalInput != null ? originalInput : ''}
                  onChange={handleOnchangeInput}
                />
              </div>
              <div className='flex-item item-actions'>
                <div className="button-actions">
                  <span className='small-text'>{isEncoded ? 'Encoded' : 'Decoded'} Output</span>
                  {stringOutput && (
                    <button onClick={handleCopy} type="button" className="btn">
                      <FontAwesomeIcon
                        style={{ width: '12px' }}
                        icon={faCopy}
                      />
                      {` `}Copy
                    </button>
                  )}
                </div>
              </div>
              <div className='flex-item item-full'>
                <textarea
                  rows="8"
                  className="full-width"
                  placeholder="Output"
                  value={stringOutput != null ? stringOutput : ''}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Base64;
