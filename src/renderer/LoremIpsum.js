import React, { useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import { LoremIpsum } from "lorem-ipsum";

import LeftNavMenu from '../components/LeftNavMenu';
import TopBarTitle from '../components/TopBarTitle';

function LoremIpsumPage() {
  const [originalInput, setOriginalinput] = useState('');
  const [numberSentence, setNumberSentence] = useState(5);
  const [minSentencesPerParagraph, setMinSentencesPerParagraph] = useState(4);
  const [maxSentencesPerParagraph, setMaxSentencesPerParagraph] = useState(8);
  const [minWordsPerSentence, setMinWordsPerSentence] = useState(4);
  const [maxWordsPerSentence, setMaxWordsPerSentence] = useState(16);

  const handleGenerate = () => {
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: maxSentencesPerParagraph,
        min: minSentencesPerParagraph,
      },
      wordsPerSentence: {
        max: maxWordsPerSentence,
        min: minWordsPerSentence,
      },
    });
    const text = lorem.generateSentences(numberSentence);
    setOriginalinput(text);
  };

  return (
    <div>
      <div className="flex-container">
        <LeftNavMenu currentPage="LoremIpsum" />
        <div className="App-Body Backgound-Grey">
          <TopBarTitle title='Lorem Ipsum' />
          <div className="Result Backgound-Grey padding-20 Base64-Result">
            <div className="flex-container-vertical">
              <div className="flex-container">
                <div className='flex-item'>
                  <div className="button-actions">
                    <span style={{fontSize: '12px'}} className="small-text">Options: </span>
                    <div className="container" style={{padding: '0px'}}>
                      <div class="row">
                        <div class="col">
                          <div class="input-group input-group-sm mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" id="inputGroup-sizing-sm">Number Sentence</span>
                            </div>
                            <input aria-label="Small" aria-describedby="inputGroup-sizing-sm" className='form-control' onChange={(event) => setNumberSentence(event.target.value)} value={numberSentence} type="number" step={1} />
                          </div>
                        </div>
                        <div class="col">
                          <div class="input-group input-group-sm mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" id="inputGroup-sizing-sm">Min Sentences Per Paragraph</span>
                            </div>
                            <input aria-label="Small" aria-describedby="inputGroup-sizing-sm" className='form-control' onChange={(event) => setMinSentencesPerParagraph(event.target.value)} value={minSentencesPerParagraph} type="number" step={1} max={8} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button style={{color: 'white', opacity: 0.8}} type="button" className="btn btn-primary" onClick={handleGenerate}>
                      Generate
                      <FontAwesomeIcon
                        style={{ width: '18px' }}
                        icon={faRandom}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-container">
                <div className='flex-item' style={{paddingTop: '5px'}}>
                  <CodeEditor
                    value={originalInput}
                    language=""
                    placeholder="Text"
                    style={{
                      fontSize: 13,
                      backgroundColor: 'white',
                      height: '70vh',
                      border: '1px solid rgb(221, 221, 221)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoremIpsumPage;
