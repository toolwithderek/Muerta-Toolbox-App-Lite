import React, { useState, useRef, useEffect } from 'react';
import Papa from "papaparse";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faUpload } from '@fortawesome/free-solid-svg-icons';
import LeftNavMenu from '../components/LeftNavMenu';
import TopBarTitle from '../components/TopBarTitle';

function CsvPreviewPage() {
  const [showLoading, setShowLoading] = useState(false);
  const [errorClass, setErrorClass] = useState('');
  const [tableColumns, setTableColumns] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [downloadJsonFileUrl, setDownloadJsonFileUrl] = useState('');
  const [downloadJsonFileName, setDownloadJsonFileName] =
    useState('result.json');
  const fileInputRef = useRef();
  // useEffect(() => {
  //   // Function to be called after rendering
  //
  // }, []);

  const handleChange = (e) => {
    setShowLoading(true);
    const { files } = e.target;
    if (!files || !files[0]) {
      return;
    }
    const file = files[0];
    const allowedExtensions = /(\.csv|\.tsv)$/i;
    if (!allowedExtensions.exec(file.name)) {
      setErrorClass('error');
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const result = fileReader.result || '';
      if (result !== '' || result !== null) {
        setErrorClass('');
        const csv = Papa.parse(result, { header: true });
        const parsedData = csv?.data;
        const columns = Object.keys(parsedData[0]);
        setTableColumns(columns);
        setShowLoading(false);
        setTableRows(parsedData);
        const inputFileName = file.name.split('.')[0];
        setDownloadJsonFileName(`${inputFileName}.json`);
        const jsonHref = `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(parsedData, null, 2))}`;
        setDownloadJsonFileUrl(jsonHref);
      }
    };

    fileReader.onerror = (error) => {
      setErrorClass('error');
    };
    fileReader.readAsText(file);
  };

  const renderRow = (row, index) => {
    const renderColumns = ['Count'].concat(tableColumns);
    return renderColumns.map((column) => {
      let value = index + 1;
      if (column !== 'Count') {
        value = row[column];
      }
      return <td>{value}</td>;
    });
  };
  const handleUpload = () => {
    fileInputRef.current.click();
  };
  const handleDownload = () => {
    const anchor = document.createElement('a');
    anchor.download = downloadJsonFileName;
    anchor.href = downloadJsonFileUrl;
    anchor.click();
  };
  return (
    <div>
      <div className="flex-container">
        <LeftNavMenu currentPage="CsvPreviewPage" />
        <div className="App-Body">
          <TopBarTitle title='CSV Preview' introduce='Preview CSV files in a pagniated tabular format.' />
          <div className={`Result padding-20 CSV-Preview ${tableColumns.length > 0 ? 'hasData' : ''}`}>
            <div className="flex-container-vertical">
              <div className='flex-item'>
                {tableColumns.length <= 0 && (
                  <label style={{marginTop: '15%'}} for="images" className={`drop-container drop-container-image ${errorClass}`}>
                    <span className="drop-title">Drop CSV file here</span>
                    <br/>or<br/>
                    <input onChange={handleChange} type="file" accept=".csv" required />
                  </label>
                )}
                {showLoading && (
                  <div style={{marginLeft: '48%', marginTop: '20%'}} className={`spinner-border`} role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </div>
              <div className='flex-item'>
                <input className='hidden' ref={fileInputRef} onChange={handleChange} type="file" accept=".csv" required />
                {tableColumns.length > 0 && (
                  <div className="button-actions">
                    <button style={{color: 'white', opacity: 0.7}} onClick={handleUpload} type="button" className="btn btn-dark">
                      <FontAwesomeIcon
                        style={{ width: '12px' }}
                        icon={faUpload}
                      />{` `} Choose another
                    </button>
                    {` `}
                     <button style={{color: 'white', opacity: 0.7}} onClick={handleDownload} type="button" className="btn btn-primary">
                      <FontAwesomeIcon
                        style={{ width: '12px' }}
                        icon={faDownload}
                      />{` `} Download as JSON
                    </button>
                  </div>
                )}
                <br />
                <div className="flex-container">
                  {tableColumns.length > 0 && (
                    <table>
                      <thead className='tableHead'>
                        <tr>
                          <th>{` `}</th>
                          {tableColumns.map((column, index) => {
                            return <th key={`index=${index + 1}`}>{column}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows.map((row, index) => {
                          return <tr key={`row-${index}`}>{renderRow(row, index)}</tr>;
                        })}
                      </tbody>
                    </table>
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

export default CsvPreviewPage;
