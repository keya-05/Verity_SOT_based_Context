import React, { useState, useMemo } from 'react';
import { Folder, FileText, Trash2, Plus, ChevronRight, ChevronDown } from 'lucide-react';

// --- 1. THE UTILITY: Tree Builder ---
const buildTree = (items) => {
  const map = {};
  const tree = [];
  items.forEach((item) => {
    map[item.id] = { ...item, children: [] };
  });
  items.forEach((item) => {
    if (item.parentId && map[item.parentId]) {
      map[item.parentId].children.push(map[item.id]);
    } else {
      tree.push(map[item.id]);
    }
  });
  return tree;
};

// --- 2. THE RECURSIVE COMPONENT ---
// Added 'isAdmin' prop here
const FileNode = ({ node, onAdd, onDelete, isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = node.type === 'folder';

  const handleAddClick = (e) => {
    e.stopPropagation();
    const name = prompt("Enter name for new item:");
    if (!name) return;
    const type = window.confirm("Is this a folder? (OK for Folder, Cancel for File)") ? 'folder' : 'file';
    onAdd(node.id, name, type);
    setIsOpen(true);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (window.confirm(`Delete ${node.name}?`)) {
      onDelete(node.id);
    }
  };

  return (
    <div style={{ marginLeft: '20px', marginTop: '8px' }}>
      <div 
        onClick={() => isFolder && setIsOpen(!isOpen)}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          cursor: isFolder ? 'pointer' : 'default',
          padding: '8px 12px',
          borderRadius: '6px',
          backgroundColor: '#ffffff',
          border: '1px solid #eee',
          marginBottom: '4px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}
      >
        <span style={{ marginRight: '10px', display: 'flex', alignItems:'center' }}>
          {isFolder ? (
            isOpen ? <ChevronDown size={18} color="#235347" /> : <ChevronRight size={18} color="#235347" />
          ) : <span style={{width: 18}} />}
          
          {isFolder ? <Folder size={18} color="#235347" fill="#23534722" /> : <FileText size={18} color="#666" />}
        </span>

        <span style={{ fontWeight: isFolder ? '600' : '400', flexGrow: 1, color: '#333' }}>
          {node.name}
        </span>

        {/* --- ROLE BASED ACTIONS --- */}
        {isAdmin && (
          <div style={{ display: 'flex', gap: '12px' }}>
            {isFolder && (
              <button 
                onClick={handleAddClick} 
                title="Add Item"
                style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#235347' }}
              >
                <Plus size={18} />
              </button>
            )}
            <button 
              onClick={handleDeleteClick} 
              title="Delete"
              style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#d32f2f' }}
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>

      {isFolder && isOpen && node.children && (
        <div style={{ borderLeft: '1.5px solid #23534733', marginLeft: '10px' }}>
          {node.children.map((child) => (
            <FileNode 
              key={child.id} 
              node={child} 
              onAdd={onAdd} 
              onDelete={onDelete} 
              isAdmin={isAdmin} // Pass role down
            />
          ))}
        </div>
      )}
    </div>
  );
};

// --- 3. THE MAIN CONTAINER ---
export default function FileExplorer({ isAdmin }) {
  const [fileData, setFileData] = useState([
    { id: '1', name: 'Root Folder', type: 'folder', parentId: null },
    { id: '2', name: 'Company Policy', type: 'folder', parentId: '1' },
    { id: '3', name: 'Resources', type: 'folder', parentId: '1' },
    { id: '4', name: 'Handbook.pdf', type: 'file', parentId: '2' },
    { id: '5', name: 'Logo.png', type: 'file', parentId: '3' },
  ]);

  const treeData = useMemo(() => buildTree(fileData), [fileData]);

  const handleAdd = (parentId, name, type) => {
    const newItem = { id: Date.now().toString(), name, type, parentId };
    setFileData([...fileData, newItem]);
  };

  const handleDelete = (itemId) => {
    const getDescendants = (id) => {
      const children = fileData.filter(item => item.parentId === id);
      let ids = children.map(c => c.id);
      children.forEach(c => { ids = [...ids, ...getDescendants(c.id)]; });
      return ids;
    };
    const idsToDelete = [itemId, ...getDescendants(itemId)];
    setFileData(fileData.filter(item => !idsToDelete.includes(item.id)));
  };

  return (
    <div style={{ fontFamily: 'inherit' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, color: '#235347' }}>Document Hierarchy</h3>
        
        {/* Only show Add Root button if Admin */}
        {isAdmin && (
          <button 
            onClick={() => {
                const name = prompt("Enter Root Folder Name:");
                if(name) handleAdd(null, name, 'folder');
            }}
            style={{ 
                backgroundColor: '#235347', 
                color: 'white', 
                border: 'none', 
                padding: '8px 15px', 
                borderRadius: '5px', 
                cursor: 'pointer',
                fontWeight: 'bold'
            }}
          >
            + New Root
          </button>
        )}
      </div>
      
      <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
        {treeData.map((node) => (
          <FileNode 
            key={node.id} 
            node={node} 
            onAdd={handleAdd} 
            onDelete={handleDelete} 
            isAdmin={isAdmin} // Pass role down
          />
        ))}
      </div>
    </div>
  );
}