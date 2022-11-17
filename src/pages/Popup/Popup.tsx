import React, { useEffect, useState } from 'react';
import './Popup.css';
// import { notes } from "../../data/notes"
import Sidebar from '../../components/Sidebar';
import NoteForm from './pages/NoteForm';
import { Routes, Route,  BrowserRouter as Router , HashRouter} from "react-router-dom";
import Homepage from './pages/Homepage';
import useShareState from '../../store/share';

const Popup = () => {

  const { isSidebar, setSidebar } = useShareState()

  return (
    <div className="">
      <Sidebar isOpen={isSidebar} onClose={() => setSidebar(false)} />
     
        <HashRouter basename='/'>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path="form/:id" element={<NoteForm />} />
        </Routes>
        </HashRouter>
      
     

    </div>
  );
};

export default Popup;
