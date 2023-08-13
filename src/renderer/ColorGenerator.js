import React, { useState } from 'react';
import { SketchPicker, SwatchesPicker } from 'react-color';
import LeftNavMenu from '../components/LeftNavMenu';
import TopBarTitle from '../components/TopBarTitle';

function ColorGenerator() {
  const [background, setBackground] = useState('#fff');
  const [htmlColorChart, setHtmlColorChart] = useState();
  const htmlColorChartKeys = ['oldHue', 'hex', 'rgb'];
  const handleChangeComplete = (color) => {
    setBackground(color.hex);
  };
  const handleOnchange = (color) => {
    setHtmlColorChart(color);
  };
  const renderColorType = (type, value) => {
    let result = '';
    switch (type) {
      case 'oldHue':
        result = value;
        break;
      case 'hex':
        result = value;
        break;
      case 'rgb':
        result = `rgb(${value.r}, ${value.g}, ${value.b})`;
        break;
      default:
        result = '';
    }
    return result;
  };
  return (
    <div>
      <div className="flex-container">
        <LeftNavMenu currentPage="Color-Generator" />
        <div className="App-Body Backgound-Grey">
          <TopBarTitle title='HTML Color Codes' />
          <div className="Result Backgound-Grey padding-20 Base64-Result Color-Generator">
            <div className="flex-container">
              <div className='flex-item'>
                <span className='small-text'>HTML Color Chart</span>
                <SwatchesPicker onChange={handleOnchange} />
              </div>
              <div className='flex-item'>
                <span className='small-text'>HTML Color Picker</span>
                <SketchPicker color={background} onChangeComplete={handleChangeComplete} />
              </div>
            </div>
            <div className="flex-container">
              <div className='flex-item'>
                <table style={{width: '72%', padding: '10px', fontSize: '15px'}}>
                  <tbody>
                    {htmlColorChart && (
                      <tr>
                        <th>{' '}</th>
                        {htmlColorChartKeys.map((k) => {
                          return (<th>{ k === 'oldHue' ? 'HUE' : k.toUpperCase()}</th>)
                        })}
                      </tr>
                    )}
                    {htmlColorChart && (
                      <tr>
                        <td><span style={{backgroundColor: htmlColorChart['hex'] }} className='color-display' /></td>
                        {htmlColorChartKeys.map((k) => {
                          return (<td>{renderColorType(k, htmlColorChart[k])}</td>)
                        })}
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className='flex-item'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColorGenerator;
