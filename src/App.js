import React, { useEffect, useState } from 'react'
import './App.css';
import Cases from './Cases';
import axios, { all } from 'axios';
import Overallcases from './Overallcases';
import Casestable from './Casestable';


function App() {

  const [alldata,setalldata] = useState()
  const [statedata, setstatedata] = useState()
  const [casesdata,setcasesdata] = useState()
  const [alltabledata, setalltabledata] = useState()


    const fetchUserData = async () => {
      const response = await axios.get(
      "https://mocki.io/v1/b2ac46d3-385d-448a-a77a-9bc2c5b5dcbc");
      setalldata(response.data.data);   
    }

    useEffect(()=>{
      fetchUserData()
    },[])

    useEffect(() => {
      const processedData = processData(alldata);
      setstatedata(processedData);

      tabledata(alldata)
    }, [alldata]);

    const processData = (data) => {

      if(alldata){
    
        const deathCases = {};
        const recoveries = {};
        const newCases = {};
      
        data.forEach((entry) => {

          const updateString = entry.update;
          const stateMatch = updateString.match(/in ([A-Za-z\s]+)(\\n| |$)/);
    
          const state = stateMatch ? stateMatch[1] : "Unknown";
    
          const deathMatches = updateString.match(/(\d+) deaths?/);
          const recoveryMatches = updateString.match(/(\d+) recoveries?/);
          const newCasesMatches = updateString.match(/(\d+) new cases?/);
    
          if (deathMatches && deathMatches[1]) {
            const deathCount = parseInt(deathMatches[1], 10);
            deathCases[state] = deathCases[state] ? deathCases[state] + deathCount : deathCount;
          }
    
          if (recoveryMatches && recoveryMatches[1]) {
            const recoveryCount = parseInt(recoveryMatches[1], 10);
            recoveries[state] = recoveries[state] ? recoveries[state] + recoveryCount : recoveryCount;
          }
    
          if (newCasesMatches && newCasesMatches[1]) {
            const newCasesCount = parseInt(newCasesMatches[1], 10);
            newCases[state] = newCases[state] ? newCases[state] + newCasesCount : newCasesCount;
          }
        });

      
        // Create a single object with state-wise data
        const stateData = {};
        Object.keys(deathCases).forEach((state) => {
          stateData[state] = {
            deathCases: deathCases[state],
            recoveries: recoveries[state],
            newCases: newCases[state],
          };
        });
      
  
        setcasesdata(overallData)

        return stateData;
      };
  
      }



      let overallData = []

      if(alldata){
        overallData = alldata.map((entry) => {
          const newCasesMatch = entry.update.match(/(\d+) new cases?/);
          const recoveriesMatch = entry.update.match(/(\d+) recoveries?/);
          const deathCasesMatch = entry.update.match(/(\d+) deaths?/);
        
          return {
            timestamp: entry.timestamp,
            newCases: newCasesMatch ? parseInt(newCasesMatch[1], 10) : 0,
            recoveries: recoveriesMatch ? parseInt(recoveriesMatch[1], 10) : 0,
            deathCases: deathCasesMatch ? parseInt(deathCasesMatch[1], 10) : 0,
          };
        });
      }



      const tabledata=(data)=>{

        const stateWiseData = {};
  
        if(alldata){
          data.forEach((entry) => {
            const stateMatch = entry.update.match(/in ([A-Za-z\s]+)\n/);
            const state = stateMatch ? stateMatch[1] : "Unknown";
          
            const newCasesMatch = entry.update.match(/(\d+) new cases?/);
            const recoveriesMatch = entry.update.match(/(\d+) recoveries?/);
            const deathCasesMatch = entry.update.match(/(\d+) deaths?/);
          
            const newCases = newCasesMatch ? parseInt(newCasesMatch[1], 10) : 0;
            const recoveries = recoveriesMatch ? parseInt(recoveriesMatch[1], 10) : 0;
            const deathCases = deathCasesMatch ? parseInt(deathCasesMatch[1], 10) : 0;
          
            if (!stateWiseData[state]) {
              stateWiseData[state] = {
                state,
                newCases,
                recoveries,
                deathCases,
              };
            } else {
              stateWiseData[state].newCases += newCases;
              stateWiseData[state].recoveries += recoveries;
              stateWiseData[state].deathCases += deathCases;
            }


          });

          setalltabledata(stateWiseData)


      
        }
      }

      

     console.log(casesdata)


    


  return (
    <div>
        <h1>State Wise Cases</h1>
        <div className="App">
          {overallData && <Overallcases data={overallData}/>}
          {statedata && <Cases data={statedata} />}
        </div>
        <div>
        {alltabledata && <Casestable data={Object.values(alltabledata)}/>}
        </div>
        
    </div>
  );
}

export default App;
