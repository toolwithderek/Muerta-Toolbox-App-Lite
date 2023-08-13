import React, { useState, useRef, useEffect } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import jsyaml from 'js-yaml';
import { prettyPrintJson } from 'pretty-print-json';

import LeftNavMenu from '../components/LeftNavMenu';
import TopBarTitle from '../components/TopBarTitle';

function Json2Yaml(props) {
  const { isReverse } = props;
  const languageInput = isReverse ? 'yaml' : 'json';
  const languageOutput = isReverse ? 'json' : 'yaml';
  const pageTitle = isReverse ? 'YAML to JSON' : 'JSON to YAML';
  const displayRef = useRef();
  const [originalInput, setOriginalinput] = useState('');
  const [stringOutput, setStringOutput] = useState('');
  const [isCoppied, setIsCoppied] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('white');
  const inputStyle = {
    fontSize: 13,
    backgroundColor:backgroundColor,
    height: '82vh',
    border: '1px solid rgb(221, 221, 221)',
  };

  useEffect(() => {
    setOriginalinput('');
    setStringOutput('');
  }, [isReverse]);

  const handleOnchangeInput = (event) => {
    const inputString = event.target.value;
    setOriginalinput(inputString);
    if (inputString !== null && inputString !== '') {
      try {
        if (isReverse) {
          const json = jsyaml.load(inputString);
          const formatedJson = prettyPrintJson.toHtml(json, {quoteKeys: true});
          setStringOutput(formatedJson);
        } else {
          const inputJson = JSON.parse(inputString);
          const yaml = jsyaml.dump(inputJson);
          setStringOutput(yaml);
        }
        setBackgroundColor('white');
      } catch (err) {
        setBackgroundColor('#ffe6e6');
        setStringOutput(null);
      }
    } else {
      setStringOutput(null);
      setBackgroundColor('white');
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(displayRef.current.innerText);
    setIsCoppied(true);
    setTimeout(() => {
      setIsCoppied(false);
    }, 800);
  };

  return (
    <div>
      <div className="flex-container">
        <LeftNavMenu currentPage={pageTitle.split(' ').join('-')} />
        <div className="App-Body Backgound-Grey">
          <TopBarTitle title={pageTitle} />
          <div className="Result Backgound-Grey padding-20 Base64-Result">
            <div className="flex-container-vertical">
              <div className="flex-container">
                <div className='flex-item left-item'>
                  <div className="button-actions">
                    <span className="small-text">Input</span>
                  </div>
                </div>
                <div className='flex-item right-item'>
                  <div className='flex-item item-actions text-right'>
                    <div className="button-actions">
                      {stringOutput && (
                        <button style={{marginBottom:'15px', width: "100px"}} onClick={handleCopy} type="button" className="btn">
                          <FontAwesomeIcon
                            style={{ width: '18px' }}
                            icon={faCopy}
                          />
                          {` `} {isCoppied ? 'Coppied' : 'Copy'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-container">
                <div className='flex-item left-item padding-right-5'>
                  <CodeEditor
                    value={originalInput}
                    language={languageInput}
                    placeholder={languageInput.toUpperCase()}
                    onChange={handleOnchangeInput}
                    style={inputStyle}
                  />
                </div>
                <div className='flex-item right-item padding-left-5'>
                 { !isReverse && (
                    <CodeEditor
                    value={stringOutput}
                    language={languageOutput}
                    placeholder={languageOutput.toUpperCase()}
                    style={inputStyle}
                  />
                 )}
                 { isReverse && (
                    <pre ref={displayRef} style={{height: '82vh', fontSize: '13px', padding: "5px"}} class="json-container" dangerouslySetInnerHTML={{__html: stringOutput }} />
                 )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Json2Yaml;
