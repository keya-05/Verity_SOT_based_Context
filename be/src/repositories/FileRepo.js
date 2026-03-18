import File from '../models/File.js';

export const getFilesByRole = async (userId, role) => {
    // If Admin: Return every single file in the DB
    if (role === 'admin') {
        return await File.find({});
    }

    // If User: Return only files they own OR files marked as public
    return await File.find({
        $or: [
            { ownerId: userId },
            { isPublic: true }
        ]
    });
};

export const addFileEntry = async (fileData) => {
    const newFile = new File(fileData);
    return await newFile.save();
};

export const deleteFileEntry = async (fileId) => {
    // Note: In a real app, you'd also delete children recursively here
    return await File.findByIdAndDelete(fileId);
};