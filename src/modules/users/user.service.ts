import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: IUser) => {
  const user = await User.create(payload);

  return user;
};

const getAllUsers = async () => {
  return await User.find().sort({ createdAt: -1 });
};

const getSingleUser = async (id: string) => {
  return await User.findById(id);
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
) => {
  return await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
};

const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};