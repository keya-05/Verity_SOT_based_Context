import React, { useState, useMemo } from 'react';
import { Folder, FileText, Trash2, Plus, ChevronRight, ChevronDown } from 'lucide-react';

// --- 1. THE UTILITY: Tree Builder ---
// This turns your Flat DB list into a Nested Tree for React
const buildTree = (items) => {
  const map = {};
  const tree = [];

  // Initialize the map
  items.forEach((item) => {
    map[item.id] = { ...item, children: [] };
  });

  // Connect parents and children
  items.forEach((item) => {
    if (item.parentId && map[item.parentId]) {
      map[item.parentId].children.push(map[item.id]);
    } else {
      tree.push(map[item.id]); // It's a root item
    }
  });

  return tree;
};

// --- 2. THE RECURSIVE COMPONENT ---
const FileNode = ({ node, onAdd, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = node.type === 'folder';

  const handleAddClick = (e) => {
    e.stopPropagation(); // Stop folder from toggling when clicking add
    const name = prompt("Enter name for new item:");
    if (!name) return;
    const type = window.confirm("Is this a folder? (OK for Folder, Cancel for File)") ? 'folder' : 'file';
    onAdd(node.id, name, type);
    setIsOpen(true); // Auto-open folder after adding
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (window.confirm(`Delete ${node.name}?`)) {
      onDelete(node.id);
    }
  };

  return (
    <div style={{ marginLeft: '20px', marginTop: '5px' }}>
      {/* The Row Display */}
      <div 
        onClick={() => isFolder && setIsOpen(!isOpen)}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          cursor: isFolder ? 'pointer' : 'default',
          padding: '4px',
          borderRadius: '4px',
          backgroundColor: '#f5f5f5',
          border: '1px solid #ddd',
          marginBottom: '2px'
        }}
      >
        {/* Icon Logic */}
        <span style={{ marginRight: '8px', display: 'flex', alignItems:'center' }}>
          {isFolder ? (
            isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
          ) : <span style={{width: 16}} />} {/* Spacer for files */}
          
          {isFolder ? <Folder size={16} color="#3b82f6" /> : <FileText size={16} color="#6b7280" />}
        </span>

        <span style={{ fontWeight: isFolder ? 'bold' : 'normal', flexGrow: 1 }}>
          {node.name}
        </span>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Only Folders can have things added inside them */}
          {isFolder && (
            <button 
              onClick={handleAddClick} 
              title="Add Item"
              style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'green' }}
            >
              <Plus size={16} />
            </button>
          )}
          
          <button 
            onClick={handleDeleteClick} 
            title="Delete"
            style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'red' }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* RECURSION: If open and has children, render them */}
      {isFolder && isOpen && node.children && (
        <div style={{ borderLeft: '1px solid #ccc' }}>
          {node.children.map((child) => (
            <FileNode 
              key={child.id} 
              node={child} 
              onAdd={onAdd} 
              onDelete={onDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

// --- 3. THE MAIN CONTAINER ---
export default function FileExplorer() {
  // Mock Database State (Flat List)
  const [fileData, setFileData] = useState([
    { id: '1', name: 'Root Folder', type: 'folder', parentId: null },
    { id: '2', name: 'Documents', type: 'folder', parentId: '1' },
    { id: '3', name: 'Images', type: 'folder', parentId: '1' },
    { id: '4', name: 'Resume.pdf', type: 'file', parentId: '2' },
    { id: '5', name: 'Profile.png', type: 'file', parentId: '3' },
  ]);

  // Transform Flat Data -> Tree whenever fileData changes
  const treeData = useMemo(() => buildTree(fileData), [fileData]);

  // --- ACTIONS ---
  
  const handleAdd = (parentId, name, type) => {
    const newItem = {
      id: Date.now().toString(), // Generate simple unique ID
      name,
      type,
      parentId
    };
    setFileData([...fileData, newItem]);
  };

  const handleDelete = (itemId) => {
    // 1. Find all items to delete (Cascade Delete Logic)
    // In a real app, backend does this. On frontend, we must find all descendants.
    const getDescendants = (id) => {
      const children = fileData.filter(item => item.parentId === id);
      let ids = children.map(c => c.id);
      children.forEach(c => {
        ids = [...ids, ...getDescendants(c.id)];
      });
      return ids;
    };

    const idsToDelete = [itemId, ...getDescendants(itemId)];
    setFileData(fileData.filter(item => !idsToDelete.includes(item.id)));
  };

  const handleAddRoot = () => {
     const name = prompt("Enter Root Folder Name:");
     if(name) handleAdd(null, name, 'folder');
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px' }}>
      <h2>My File Explorer</h2>
      <button 
        onClick={handleAddRoot}
        style={{ marginBottom: '10px', padding: '5px 10px', cursor: 'pointer' }}
      >
        + Add Root Folder
      </button>
      
      <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
        {treeData.map((node) => (
          <FileNode 
            key={node.id} 
            node={node} 
            onAdd={handleAdd} 
            onDelete={handleDelete} 
          />
        ))}
      </div>
    </div>
  );
}