import { Schema, model, Document, Types } from 'mongoose'

export interface IWorkout extends Document {
  title: string
  description?: string
  exercises: { name: string; reps?: number; durationSec?: number }[]
  difficulty?: string
  createdBy?: Types.ObjectId
  createdAt: Date
}

const WorkoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String },
  exercises: [{ name: String, reps: Number, durationSec: Number }],
  difficulty: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: () => new Date() }
})

export default model<IWorkout>('Workout', WorkoutSchema)
