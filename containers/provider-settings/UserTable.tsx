// components/UserTable.tsx

import React from 'react';
import { IUser } from '@/modules/user/types';

interface UserTableProps {
  users: IUser[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              First Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Last Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{user.first_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.last_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && (
        <div className="px-6 py-4 text-center text-sm text-gray-500">No users found.</div>
      )}
    </div>
  );
};

export default UserTable;
