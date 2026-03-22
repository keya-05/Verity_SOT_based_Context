// AddItemModal.js
import React, { useState } from 'react';
import { Folder, FileText } from 'lucide-react';

const AddItemModal = ({ isOpen, onClose, onAddFolder, onAddFile }) => {
  const [mode, setMode] = useState('select'); // 'select' or 'folder-name'
  const [folderName, setFolderName] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    setMode('select');
    setFolderName('');
    onClose();
  };

  const handleFolderSubmit = () => {
    if (folderName.trim()) {
      onAddFolder(folderName);
      handleClose();
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{
        background: 'white', padding: '25px', borderRadius: '10px',
        width: '320px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        
        {mode === 'select' && (
          <>
            <h3 style={{ marginTop: 0, color: '#333' }}>Add New Item</h3>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>What would you like to create?</p>
            
            <button 
              onClick={() => setMode('folder-name')} 
              style={{ width: '100%', padding: '12px', marginBottom: '10px', backgroundColor: '#f0f4f8', border: '1px solid #d9e2ec', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', color: '#102a43' }}
            >
              <Folder size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> 
              New Folder
            </button>
            
            <button 
              onClick={() => { onAddFile(); handleClose(); }} 
              style={{ width: '100%', padding: '12px', backgroundColor: '#f0f4f8', border: '1px solid #d9e2ec', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', color: '#102a43' }}
            >
              <FileText size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Upload File
            </button>

            <button onClick={handleClose} style={{ width: '100%', padding: '10px', marginTop: '15px', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>
              Cancel
            </button>
          </>
        )}

        {mode === 'folder-name' && (
          <>
            <h3 style={{ marginTop: 0, color: '#333' }}>Name your folder</h3>
            <input 
              autoFocus
              placeholder="e.g., Q1 Financials"
              value={folderName} 
              onChange={e => setFolderName(e.target.value)} 
              style={{ width: '100%', padding: '10px', marginBottom: '20px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }} 
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setMode('select')} style={{ padding: '8px 15px', background: 'none', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>Back</button>
              <button onClick={handleFolderSubmit} style={{ padding: '8px 15px', background: '#235347', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Create Folder</button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default AddItemModal;