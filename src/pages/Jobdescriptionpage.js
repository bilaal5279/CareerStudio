  import React, {useState} from 'react';
  import App from '../App';
  import JobDescription from '../components/JobDescription';
  import CopyAndPasteJob from '../components/CopyAndPasteJob';
import NavBar from '../components/NavBar';


  
  function Jobdescriptionpage() {
    const [showCopyAndPasteJob, setShowCopyAndPasteJob] = useState(false);
  
    const handleCopyAndPasteJobButtonClick = () => {
      setShowCopyAndPasteJob(true);
    };
  
    const handleJobDescriptionButtonClick = () => {
      setShowCopyAndPasteJob(false);
    };
  
    return (
      <div>
        <NavBar/>
        {showCopyAndPasteJob ? (
          <CopyAndPasteJob onBackButtonClick={handleJobDescriptionButtonClick} />
        ) : (
          <JobDescription onCopyButtonClick={handleCopyAndPasteJobButtonClick} />
        )}
      </div>
    );
  }
  
    export default Jobdescriptionpage;
    