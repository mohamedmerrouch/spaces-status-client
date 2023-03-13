import React from 'react';
import './App.css';
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
      <>
        <ResponsiveAppBar />
        <Outlet />
      </>
    );
}

