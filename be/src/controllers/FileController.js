import File from '../models/File.js'; // (Make sure the capitalization matches your actual filename, e.g., 'file.js')
import User from '../models/User.js'; // <-- HIDDEN FIX: You forgot to import this!
import { getFilesByOrgCode } from '../repositories/FileRepo.js';
import logger from '../utils/logger.js';

// 1. CREATE A FILE OR FOLDER
export const createFile = async (req, res) => {
    try {
        const { name, type, parentId, ownerId, isPublic, metadata } = req.body;
        
        // 1. Look up the user making the file to get their orgCode
        const user = await User.findById(ownerId);
        if (!user) {
            return res.status(404).json({ message: "Owner not found" });
        }

        // 2. Create the file WITH the orgCode included!
        const newFile = new File({
            name,
            type,
            parentId: parentId || null,
            ownerId,
            orgCode: user.orgCode, // <-- THE MAIN FIX!
            isPublic: isPublic || false,
            metadata: metadata || {}
        });

        const savedFile = await newFile.save();
        res.status(201).json(savedFile);
    } catch (error) {
        // Logging the error to your console so you can see exactly why it fails in the future
        console.error("Error creating file:", error.message); 
        res.status(500).json({ message: "Error creating file", error: error.message });
    }
};

// 2. GET EXPLORER DATA (The Role-Based Logic)
export const getExplorerFiles = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const files = await getFilesByOrgCode(user.orgCode);

        logger.info(`Fetched ${files.length} files for org: ${user.orgCode}`);
        return res.status(200).json(files);

    } catch (error) {
        logger.error(error, "Error fetching files");
        return res.status(500).json({ message: "Server error while fetching files" });
    }
};

// 3. DELETE A FILE
export const deleteFile = async (req, res) => {
    try {
        const { id } = req.params;
        await File.findByIdAndDelete(id);
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete error", error: error.message });
    }
};