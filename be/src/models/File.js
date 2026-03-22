import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['file', 'folder'],
        required: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File', // Self-reference for hierarchy
        default: null
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who created it
        required: true
    },
    orgCode: { 
        type: String, 
        required: true 
    },
    isPublic: {
        type: Boolean,
        default: false // If true, all users can see it. If false, only owner/admin.
    },
    metadata: {
        // This allows for those "varying dtypes" you mentioned
        type: Map,
        of: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const File = mongoose.model('File', fileSchema);
export default File;