import React, { useEffect, useState } from 'react';
import './Popup.css';
// import { notes } from "../../data/notes"
import Sidebar from '../../components/Sidebar';
import NoteForm from './pages/NoteForm';
import { Routes, Route,  BrowserRouter as Router , HashRouter} from "react-router-dom";
import Homepage from './pages/Homepage';
import useShareState from '../../store/share';
import Category from './pages/Category';

const Popup = () => {

  const { isSidebar, setSidebar } = useShareState()

  return (
    <div className="">
     
        <HashRouter basename='/'>
      <Sidebar isOpen={isSidebar} onClose={() => setSidebar(false)} />

        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path="form/:id" element={<NoteForm />} />
          <Route path="category" element={<Category />} />
        </Routes>
        </HashRouter>
     
    </div>
  );
};

export default Popup;
