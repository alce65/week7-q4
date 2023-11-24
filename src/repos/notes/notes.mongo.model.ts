import { Schema, model } from 'mongoose';
import { Note } from '../../entities/note';

const notesSchema = new Schema<Note>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  isImportant: {
    type: Boolean,
    required: true,
    default: false,
  },
});

notesSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const NoteModel = model<Note>('Note', notesSchema, 'notes');
