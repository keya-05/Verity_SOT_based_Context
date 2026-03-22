import File from '../models/File.js';

// Fetch all files for a specific organization
export const getFilesByOrgCode = async (orgCode) => {
    // We sort by 'type' so folders appear before files in the UI
    return await File.find({ orgCode }).sort({ type: -1, name: 1 });
};

export const addFileEntry = async (fileData) => {
    const newFile = new File(fileData);
    return await newFile.save();
};

export const deleteFileEntry = async (fileId) => {
    // Note: In a real app, you'd also delete children recursively here
    return await File.findByIdAndDelete(fileId);
};