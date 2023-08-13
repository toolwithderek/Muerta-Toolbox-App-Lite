import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHomeLg,
  faExchange,
  faExchangeAlt,
  faFont,
  faClock,
  faPalette,
  faImage,
  faRandom,
  faBug,
  faCircleInfo,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons';
import { DEFAULT_APP_CONFIG } from '../main/app_config.js';

const appConfig = DEFAULT_APP_CONFIG;

const menuItems = [
  { link: '/base64', pageName: 'Base64', icon: (<span className="custom-icon">64</span>), title: 'Base64' },
  { link: '/backslash', pageName: 'Backslash', icon: (<span className="custom-icon">/n</span>), title: 'Backslash Escape/Unescape' },
  { link: '/csv-preview', pageName: 'CsvPreviewPage', icon: (<FontAwesomeIcon className="icon-menu" icon={faFileAlt} />), title: 'CSV Preview' },
  { link: '/cron-job-parser', pageName: 'CronJob-Parser', icon: (<FontAwesomeIcon className="icon-menu" icon={faClock} />), title: 'Cron Job Parser' },
  { link: '/hash-generator', pageName: 'HashGenerator', icon: (<FontAwesomeIcon className="icon-menu" icon={faRandom} />), title: 'Hash Generator' },
  { link: '/color-generator', pageName: 'Color-Generator', icon: (<FontAwesomeIcon className="icon-menu" icon={faPalette} />), title: 'HTML Color Codes' },
  { link: '/image-to-base64', pageName: 'ImageToBase64', icon: (<FontAwesomeIcon className="icon-menu" icon={faImage} />), title: 'Base64 Image Encoder' },
  { link: '/json-to-yaml', pageName: 'JSON-to-YAML', icon: (<FontAwesomeIcon className="icon-menu" icon={faExchange} />), title: 'JSON to YAML' },
  { link: '/json-to-csv', pageName: 'JSON-to-CSV', icon: (<FontAwesomeIcon className="icon-menu" icon={faExchangeAlt} />), title: 'JSON to CSV' },
  { link: '/lorem-ipsum', pageName: 'LoremIpsum', icon: (<FontAwesomeIcon className="icon-menu" icon={faFont} />), title: 'Lorem Ipsum' },
];

function LeftNavMenu(props) {
  const { currentPage } = props;
  const navigate = useNavigate();
  const [listItems, setListItems] = useState(menuItems);
  const [showSearchFilter, setShowSearchFilter] = useState(false);
  const handleOnchangeMenu = () => {};
  const searchItem = (event) => {
    const filterText = event.target.value;
    const regex = new RegExp(filterText, 'i');
    const newListItems = menuItems.filter((item) => regex.test(item.title));
    setListItems(newListItems);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'f') {
        event.preventDefault();
        // Perform your custom action for Control + F here
        setShowSearchFilter(!showSearchFilter);
      }
      if (event.ctrlKey && event.key === 'h') {
        event.preventDefault();
        navigate('/');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSearchFilter, navigate]);
  return (
    <div className="Left-Nav-Menu">
      {showSearchFilter && (<input onChange={searchItem} type="text" placeholder="Search..." className="search-item-action form-control" />)}
      <ul className="list-group">
        <Link to="/">
          <li onClick={handleOnchangeMenu} className={`list-group-item ${currentPage === 'Home' ? 'active' : ''}`}>
            <FontAwesomeIcon className="icon-menu" icon={faHomeLg} /> Home
          </li>
        </Link>
      </ul>
      <ul className="list-group scrollable-list list-item-actions">
        {listItems.map((item) => {
          return (
            <Link to={item.link}>
              <li className={`list-group-item ${currentPage === item.pageName ? 'active' : ''}`}>{item.icon} {item.title}</li>
            </Link>
          );
        })}
      </ul>
      <hr />
      <h6 id='connection-status'>Network Status: <span id='status'></span></h6>
      <h6 id='connection-status'><span>App Versions: {appConfig.appVersion}</span></h6>
      <Link target='_blank' className="LeftNavBottomLink" to={appConfig.support_url}><FontAwesomeIcon icon={faCircleInfo}/></Link>
      <Link target='_blank' className="LeftNavBottomLink" to={appConfig.github_report_issues}><FontAwesomeIcon icon={faBug}/></Link>
    </div>
  );
}

export default LeftNavMenu;
