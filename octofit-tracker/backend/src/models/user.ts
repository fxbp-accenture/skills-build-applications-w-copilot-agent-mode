import { Schema, model, Document, Types } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  createdAt: Date
  team?: Types.ObjectId
  totalActivities?: number
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: () => new Date() },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  totalActivities: { type: Number, default: 0 }
})

export default model<IUser>('User', UserSchema)
