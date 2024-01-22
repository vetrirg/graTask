import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';

function App() {
  const [inputText, setInputText] = useState('');
  const [file, setFile] = useState(null);
  const [resultStats, setResultStats] = useState(null);
  const [aggregatedResults, setAggregatedResults] = useState(null);
  const [compareClicked, setCompareClicked] = useState(false); // State to track if Compare button is clicked
  const [uploadedFileName, setUploadedFileName] = useState(null); // State to track uploaded file name

  const handleTextChange = (e) => {
    setInputText(e.target.value);
    setFile(null); // Remove the file when text is entered
    setUploadedFileName(null); // Reset uploaded file name
  };

  const handleFileDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    setUploadedFileName(uploadedFile.name); // Set uploaded file name
    const reader = new FileReader();

    reader.onload = (event) => {
      setInputText(event.target.result);
    };

    reader.readAsText(uploadedFile);
  };

  const handleClearUpload = () => {
    setFile(null);
    setUploadedFileName(null);
  };


  const analyzeText = async () => {
    try {
      const response = await axios.post('http://localhost:5000/analyze', { text: inputText });
      setResultStats(response.data);
      console.log('Result Stats:', resultStats);
    } catch (error) {
      console.error('Error analyzing text:', error);
    }
  };

  const compareWithEarlierTask = async () => {
    try {
      const response = await axios.get('http://localhost:5000/aggregated-results');
      const fetchedAggregatedResults = response.data[0];
      setAggregatedResults(fetchedAggregatedResults);
      setCompareClicked(true);

      const comparisonResult = Object.keys(resultStats).reduce((result, key) => {
        return {
          ...result,
          [key]: {
            current: resultStats[key],
            earlierTask: aggregatedResults[key],
          },
        };
      }, {});

      console.log('Comparison Result:', comparisonResult);
    } catch (error) {
      console.error('Error fetching aggregated results:', error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Text Analyzer</h1>
          <textarea
            rows="10"
            cols="50"
            placeholder="Enter text here..."
            value={inputText}
            onChange={handleTextChange}
            className='textboxArea'
          ></textarea>
          {/* display the file name once uploaded */}
          {uploadedFileName ? (
            <div>
              <p>Uploaded File: {uploadedFileName}</p>
              <Button onClick={handleClearUpload}>Clear Upload</Button>
            </div>
          ) : (
            <Dropzone onDrop={handleFileDrop} multiple={false}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className='dropzoneStyle'>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop a text file here, or click to select one</p>
                </div>
              )}
            </Dropzone>
          )}
          <div className='button-section'>
            <Button onClick={analyzeText}>Analyze Text</Button>
            <Button onClick={compareWithEarlierTask}>Compare with Earlier Task</Button>
          </div>
        </div>
      </header>
      <div className='container'>
        <div className='tableArea'>
          {resultStats && (
            <div>
              <h2>Analysis Results:</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Statistic</th>
                    <th>Current</th>
                    {compareClicked && <th>Earlier Task</th>}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(resultStats).map((key) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{resultStats[key]}</td>
                      {compareClicked && <td>{aggregatedResults[key]}</td>}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
