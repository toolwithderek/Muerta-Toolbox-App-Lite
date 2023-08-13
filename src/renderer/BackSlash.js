import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import Toggle from 'react-toggle';
import { addSlashes, removeSlashes } from 'slashes';

import LeftNavMenu from '../components/LeftNavMenu';
import TopBarTitle from '../components/TopBarTitle';

function BackSlash() {
  const [originalInput, setOriginalinput] = useState(null);
  const [stringOutput, setStringOutput] = useState('');
  const [isEncoded, setIsEncoded] = useState(true);

  const escapeBackslashes = (str) => {
    return addSlashes(str);
  };

  const unescapeBackslashes = (str) => {
    return removeSlashes(str);
  };

  const handleOnchangeInput = (event) => {
    const inputString = event.target.value;
    setOriginalinput(inputString);
    let outputString = '';
    if (isEncoded) {
      outputString = escapeBackslashes(inputString);
    } else {
      outputString = unescapeBackslashes(inputString);
    }
    setStringOutput(outputString);
  };
  const handleToogle = (event) => {
    const currentValue = event.target.checked;
    let outputString = '';
    if (currentValue) {
      outputString = escapeBackslashes(originalInput);
    } else {
      outputString = unescapeBackslashes(originalInput);
    }
    setIsEncoded(currentValue);
    setStringOutput(outputString);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(stringOutput);
  };
  return (
    <div>
      <div className="flex-container">
        <LeftNavMenu currentPage="Backslash" />
        <div className="App-Body">
          <TopBarTitle title='Backslash Escape/Unescape' />
          <div className="Result Backgound-Gray padding-20 Base64-Result">
            <div className="flex-container-vertical">
              <div className='flex-item item-actions'>
                <div className="button-actions">
                  <Toggle disabled={originalInput == null || originalInput === '' } id="encode-tootgle" defaultChecked={isEncoded} onChange={handleToogle} />
                </div>
              </div>
              <div className='flex-item item-full'>
                <textarea
                  rows="8"
                  className="full-width"
                  placeholder="String input"
                  value={originalInput != null ? originalInput : ''}
                  onChange={handleOnchangeInput}
                />
              </div>
              <div className='flex-item item-actions'>
                <div className="button-actions">
                  <span className='small-text'>{isEncoded ? 'Escape' : 'Unescape'} Output</span>
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
                  placeholder="String output"
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

export default BackSlash;
