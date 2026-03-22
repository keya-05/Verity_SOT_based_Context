import React, { useState, useEffect, useMemo } from 'react';
import { Folder, FileText, Trash2, Plus, ChevronRight, ChevronDown } from 'lucide-react';
import AddItemModal from './AddItemModal';

// --- 1. THE UTILITY: Tree Builder ---
// Converts Flat MongoDB array to Nested Tree
const buildTree = (items) => {
  // If items is not an array (e.g., it's null or an error object), return an empty tree
  if (!items || !Array.isArray(items)) {
    return [];
  }

  const map = {};
  const tree = [];

  items.forEach((item) => {
    const id = item._id || item.id;
    map[id] = { ...item, id, children: [] };
  });

  items.forEach((item) => {
    const id = item._id || item.id;
    if (item.parentId && map[item.parentId]) {
      map[item.parentId].children.push(map[id]);
    } else {
      tree.push(map[id]);
    }
  });

  return tree;
};

// --- 2. THE RECURSIVE COMPONENT (FileNode) ---
const FileNode = ({ node, onAdd, onDelete, isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = node.type === 'folder';

  const handleAddClick = (e) => {
    e.stopPropagation();
    onAdd(); // Triggers the modal from the parent
    setIsOpen(true); 
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (window.confirm(`Delete ${node.name}?`)) {
      onDelete(node.id);
    }
  };

  return (
    <div style={{ marginLeft: '20px', marginTop: '5px' }}>
      <div 
        onClick={() => isFolder && setIsOpen(!isOpen)}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          cursor: isFolder ? 'pointer' : 'default',
          padding: '6px',
          borderRadius: '4px',
          backgroundColor: '#f9f9f9',
          border: '1px solid #eee',
          marginBottom: '2px'
        }}
      >
        <span style={{ marginRight: '8px', display: 'flex', alignItems:'center' }}>
          {isFolder ? (
            isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
          ) : <span style={{width: 16}} />}
          {isFolder ? <Folder size={16} color="#235347" /> : <FileText size={16} color="#6b7280" />}
        </span>

        <span style={{ fontWeight: isFolder ? 'bold' : 'normal', flexGrow: 1, color: '#333' }}>
          {node.name}
        </span>

        {isAdmin && (
          <div style={{ display: 'flex', gap: '8px' }}>
            {/* Note: I moved the action buttons into the main row, not conditionally wrapped by isAdmin here so you can test. If you want only admins to add/delete, keep your wrapper */}
            {isFolder && (
              <button onClick={handleAddClick} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'green' }}>
                <Plus size={16} />
              </button>
            )}
            <button onClick={handleDeleteClick} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'red' }}>
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {isFolder && isOpen && node.children && (
        <div style={{ borderLeft: '1px solid #ccc' }}>
          {node.children.map((child) => (
            <FileNode key={child.id} node={child} onAdd={onAdd} onDelete={onDelete} isAdmin={isAdmin} />
          ))}
        </div>
      )}
    </div>
  );
};

// --- 3. THE MAIN CONTAINER (FileExplorer) ---
export default function FileExplorer({ isAdmin }) {
  const [fileData, setFileData] = useState([]);
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');
  const [modalConfig, setModalConfig] = useState({ isOpen: false, parentId: null });

  const fetchFiles = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/files/explorer?userId=${userId}&role=${role}`);
      const data = await response.json();
      
      // CRITICAL: Only update state if the data is actually an array
      if (response.ok && Array.isArray(data)) {
        setFileData(data);
      } else {
        console.error("Backend did not return an array:", data);
        setFileData([]); // Reset to empty array on error
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      setFileData([]);
    }
  };

  useEffect(() => {
    // Only fetch if we have a userId and role
    if (userId && role) {
      fetchFiles();
    }
  }, [userId, role]);

  const handleAdd = async (parentId, name, type) => {
    try {
      const response = await fetch('http://localhost:8000/api/files/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, type, parentId, ownerId: userId, isPublic: isAdmin })
      });
      if (response.ok) fetchFiles();
    } catch (error) {
      console.error("Error adding file:", error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/files/${itemId}`, { method: 'DELETE' });
      if (response.ok) fetchFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const openModal = (parentId) => {
    setModalConfig({ isOpen: true, parentId });
  };

  const handleModalAddFolder = (folderName) => {
    handleAdd(modalConfig.parentId, folderName, 'folder');
  };

  const handleModalAddFile = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        handleAdd(modalConfig.parentId, file.name, 'file', file); 
      }
    };
    fileInput.click();
  };

  const treeData = useMemo(() => buildTree(fileData), [fileData]);

  return (
    <div style={{ padding: '10px' }}>
      
      {/* 2. USE THE IMPORTED MODAL HERE */}
      <AddItemModal 
        isOpen={modalConfig.isOpen} 
        onClose={() => setModalConfig({ isOpen: false, parentId: null })}
        onAddFolder={handleModalAddFolder}
        onAddFile={handleModalAddFile}
      />

      {isAdmin && (
        <button 
          onClick={() => openModal(null)} 
          style={{ marginBottom: '15px', padding: '8px 15px', backgroundColor: '#235347', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          + Add Root Folder
        </button>
      )}
      
      <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', minHeight: '200px' }}>
        {treeData.length > 0 ? (
          treeData.map((node) => (
            <FileNode 
              key={node.id} 
              node={node} 
              onAdd={() => openModal(node.id)} 
              onDelete={handleDelete} 
              isAdmin={isAdmin} 
            />
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#888' }}>No documents found.</p>
        )}
      </div>
    </div>
  );
}