import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const inter = Inter({ subsets: ["latin"] });
export default function TestApi() {
  const [responseData, setResponseData] = useState(null);

  async function fetchData() {
    try {
      const response = await fetch('/api/api');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setResponseData(data.fact);
    } catch (error) {
      console.error(error);
    }
  }

  function randomColor(){
    const bgColor = `#${Math.floor(Math.random() * (256 * 256 * 256)).toString(16).padStart(6, '0')}`;
    document.body.style.backgroundColor = bgColor;
  }

  setInterval(randomColor, 3000)
  useEffect(() => {
    fetchData()

  }, []);

  const handleRefreshClick = () => {
    fetchData();
  };



  return (
    <div className="container-fluid">
      <h1 className="h2 text-center my-5 text-primary fw-bold">Cat facts</h1>
      <div className="row text-center" style={{ backgroundColor: 'cyan', height: '150px', width: '900px', margin: '0 auto', borderRadius: '15px' }}>
        {responseData ? (
          <div>
            <h2>Data received:</h2>
            {/* <pre>{JSON.stringify(responseData, null, 2)}</pre> */}
            <h1 className="h4 text-primary">{responseData}</h1>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="col text-center">
        <button type="button" className="btn btn-primary my-5" onClick={handleRefreshClick}>
          Refresh
        </button>
      </div>
    </div>
  );
}




