import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './Custom.scss';

import Home from './Home';
import Base64 from './Base64';
import Json2Yaml from './Json2Yaml';
import Json2Csv from './Json2Csv';
import LoremIpsum from './LoremIpsum';
import CronJobParserPage from './CronJobParser';
import ColorGenerator from './ColorGenerator';
import ImageToBase64 from './ImageToBase64';
import BackSlash from './BackSlash';
import CsvPreviewPage from './CsvPreview';
import HashGenerator from './HashGenerator';

const updateOnlineStatus = () => {
  if (document.getElementById('status')) {
    document.getElementById('status').innerHTML = navigator.onLine ? 'Online' : 'Offline';
  }
};
setInterval(updateOnlineStatus, 100);
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/base64" element={<Base64 />} />
        <Route path="/json-to-yaml" element={<Json2Yaml isReverse={false} />} />
        <Route path="/json-to-csv" element={<Json2Csv isReverse={false} />} />
        <Route path="/lorem-ipsum" element={<LoremIpsum />} />
        <Route path="/cron-job-parser" element={<CronJobParserPage />} />
        <Route path="/color-generator" element={<ColorGenerator />} />
        <Route path="/image-to-base64" element={<ImageToBase64 />} />
        <Route path="/backslash" element={<BackSlash />} />
        <Route path="/csv-preview" element={<CsvPreviewPage />} />
        <Route path="/hash-generator" element={<HashGenerator />} />
      </Routes>
    </Router>
  );
}
