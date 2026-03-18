import File from '../models/File.js';

// 1. CREATE A FILE OR FOLDER
export const createFile = async (req, res) => {
    try {
        const { name, type, parentId, ownerId, isPublic, metadata } = req.body;
        
        const newFile = new File({
            name,
            type,
            parentId: parentId || null,
            ownerId,
            isPublic: isPublic || false,
            metadata: metadata || {}
        });

        const savedFile = await newFile.save();
        res.status(201).json(savedFile);
    } catch (error) {
        res.status(500).json({ message: "Error creating file", error: error.message });
    }
};

// 2. GET EXPLORER DATA (The Role-Based Logic)
export const getExplorerData = async (req, res) => {
    try {
        const { userId, role } = req.query;

        let query = {};

        // Logic: Admin sees EVERYTHING. User sees OWN files OR PUBLIC files.
        if (role !== 'admin') {
            query = {
                $or: [
                    { ownerId: userId },
                    { isPublic: true }
                ]
            };
        }

        const files = await File.find(query);
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ message: "Error fetching explorer data", error: error.message });
    }
};

// 3. DELETE A FILE (And all its children)
export const deleteFile = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find all descendants (simplified for now, usually requires a recursive function)
        // For testing, we just delete the specific ID
        await File.findByIdAndDelete(id);
        
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete error", error: error.message });
    }
};