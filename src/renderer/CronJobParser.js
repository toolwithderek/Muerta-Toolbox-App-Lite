import React, { useState, useEffect } from 'react';
import CronParser from 'cron-parser';
import cronstrue from 'cronstrue';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlay } from '@fortawesome/free-solid-svg-icons';

import LeftNavMenu from '../components/LeftNavMenu';
import TopBarTitle from '../components/TopBarTitle';
import { underscoreToTitle } from '../ultils/helpers';

// const ct = require('countries-and-timezones');

function CronJobParserPage() {
  const [loadingCompleted, setLoadingCompleted] = useState(false);
  const [timeZone, setTimeZone] = useState('Asia/Ho_Chi_Minh');
  const [expression, setExpression] = useState('*/5 * * * *');
  const [humanText, setHumanText] = useState('');
  const [prexRun, setPrevRun] = useState('');
  const [nextRun, setNextRun] = useState('');
  const [fields, setFields] = useState();
  const dayOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // const [allTimeZones, setAllTimeZones] = useState([]);
  // const [timeZoneOption, setTimeZoneOption] = useState('VN_Asia/Ho_Chi_Minh');

  const handleParse = () => {
    try {
      // const date = new Date();
      // const opts = {
      //   timeZone: timeZone,
      // };
      // const dateTimeFormat = new Intl.DateTimeFormat([], opts);
      // const dateTimeString = dateTimeFormat.format(new Date());
      const options = {
        currentDate: new Date(),
        tz: timeZone,
      };
      const interval = CronParser.parseExpression(expression, options);
      setPrevRun(interval.prev().toString());
      setNextRun(interval.next().toString());
      setFields(JSON.parse(JSON.stringify(interval.fields)));
      setHumanText(cronstrue.toString(expression, { verbose: true }));
    } catch (err) {
      console.error('Error parsing cron expression:', err);
    }
  }

  const renderFieldValue = (field) => {
    const value = fields[field];
    switch (field) {
      case 'hour':
        if (value.length > 23) {
          return 'All';
        }
        return value.join(', ');
      case 'dayOfWeek':
        if (value.length > 6) {
          return 'All';
        }
        return value.map((v) => dayOfWeekNames[v]).join(', ');
      case 'dayOfMonth':
        if (value.length > 28) {
          return 'All';
        }
        return value.join(', ');
      case 'month':
        if (value.length === 12) {
          return 'All';
        }
        break;
      default:
        return value.join(', ');
    }
  };
  useEffect(() => {
    if (!loadingCompleted) {
      setLoadingCompleted(true);
      setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
      if (expression) {
        handleParse();
      }
      // const countries = ct.getAllCountries();
      // const allTimeZones = [];
      // Object.keys(countries).map((k) => {
      //   countries[k].timezones.map((tz) => {
      //     allTimeZones.push({name: `${countries[k].name} - ${tz}`, value: `${k}_${tz}`, timezone: tz});
      //   });
      // });
      // setAllTimeZones(allTimeZones);
    }
  }, [timeZone, handleParse, loadingCompleted, expression]);

  // const handleOnchangeTimezone = (event) => {
  //   const selectTimezone = allTimeZones.filter((tz) => tz.value === event.target.value);
  //   setTimeZone(selectTimezone[0].timezone);
  //   setTimeZoneOption(event.target.value);
  //   if (expression) {
  //     handleParse();
  //   }
  // };
  return (
    <div>
      <div className="flex-container">
        <LeftNavMenu currentPage="CronJob-Parser" />
        <div className="App-Body Backgound-Grey">
          <TopBarTitle title='Cron Job Parser' introduce='Parse, validate and debug cron' />
          <div className="Result Backgound-Grey padding-20 Base64-Result p-5">
            <div className="flex-container-vertical">
              <div className="flex-container-vertical">
                <div className='flex-item'>
                  <div style={{width: "50%"}} className="input-group mb-3">
                    <input onChange={(e) => setExpression(e.target.value)} value={expression} type="text" className="form-control custom-input-bg-white" placeholder="Cron expression" />
                    <div className="input-group-append">
                      <button onClick={handleParse} style={{marginTop: '8px', height: '40px', opacity: 0.8}} className="btn btn-primary" type="button">
                        <FontAwesomeIcon
                          style={{ width: '18px' }}
                          icon={faPlay}
                        />
                        {` `} Parser
                      </button>
                    </div>
                  </div>
                  {/* <div style={{width: "50%"}} className="form-group">
                    <select
                      id="method"
                      value={timeZoneOption}
                      onChange={handleOnchangeTimezone}
                      className="form-control"
                    >
                      {allTimeZones.map((tz) => {
                        return (<option value={tz.value}>{tz.name}</option>)
                      })}
                    </select>
                  </div> */}
                </div>
                <div className='flex-item cron-job-explain' style={{marginTop: '10px'}}>
                  <div><h5>{humanText}</h5></div>
                  <div><label><strong>Your Local Timezone:</strong> {timeZone}</label></div>
                  <div><label><strong>Previous Run At:</strong> {prexRun}</label></div>
                  <div><label><strong>Next Run At:</strong> {nextRun}</label></div>
                  {fields && (
                    Object.keys(fields).map((field) => {
                      return (<div key={field}>
                                <label><strong>{underscoreToTitle(field)}:</strong> {renderFieldValue(field)}</label>
                              </div>)
                    })
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

export default CronJobParserPage;
