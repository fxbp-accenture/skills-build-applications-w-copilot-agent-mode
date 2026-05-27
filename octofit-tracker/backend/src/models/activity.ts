import { Schema, model, Document, Types } from 'mongoose'

export interface IActivity extends Document {
  user: Types.ObjectId
  type: string
  distanceKm?: number
  durationMinutes?: number
  date: Date
  calories?: number
}

const ActivitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  distanceKm: { type: Number },
  durationMinutes: { type: Number },
  date: { type: Date, default: () => new Date() },
  calories: { type: Number }
})

export default model<IActivity>('Activity', ActivitySchema)
