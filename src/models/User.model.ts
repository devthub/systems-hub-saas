import bcrypt from 'bcrypt';
import mongoose, { CallbackError, Document, Schema } from 'mongoose';

import { User } from '@/types/user';

// Define interface for User document
export interface UserDocument extends User, Document {
  _id: string;
  comparePassword(password: string): Promise<boolean>;
  verifyOtpCode(code: string): Promise<boolean>;
}

// Define schema for User
const UserSchema: Schema<UserDocument> = new Schema(
  {
    name: String,
    username: { type: String, unique: true, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true, select: false },
    hash: String,
    salt: String,
    role: { type: String, default: 'basic' },
    stripeCustomerId: String,
  },
  { timestamps: true }
);

UserSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  const saltFactor = process.env.SALT_WORK_FACTOR;

  try {
    if (!saltFactor) throw new Error('Please provide salt factor');

    const newSalt = await bcrypt.genSalt(parseInt(saltFactor));
    const newHash = await bcrypt.hash(this.password, newSalt);

    this.salt = newSalt;
    this.password = newHash;
    this.hash = newHash;

    return next();
  } catch (err) {
    console.error(err);
    return next(err as CallbackError);
  }
});

UserSchema.methods.comparePassword = async function comparePassword(password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.verifyOtp = function verifyOtpCode(code: string) {
  const codeExpired = Date.now() >= this.otp?.expires * 1000;
  return this.otp?.code === code && !codeExpired;
};

// Create and export User model
export default mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);
