'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Users,
  ShieldCheck,
  UserCheck,
  Plus,
  Trash2,
  RotateCcw,
  Mail,
  Phone,
  Calendar,
  KeyRound,
} from 'lucide-react';
import { UserProfileDTO } from '@/types/dto/user.dto';
import { UserRole } from '@/types/user';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { useToast } from '@/components/ui/Toast';

interface AdminUsersTableProps {
  initialUsers: UserProfileDTO[];
}

export function AdminUsersTable({ initialUsers }: AdminUsersTableProps) {
  const { showToast } = useToast();

  const [users, setUsers] = useState<UserProfileDTO[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Modals state
  const [roleChangeUser, setRoleChangeUser] = useState<UserProfileDTO | null>(null);
  const [deletingUser, setDeletingUser] = useState<UserProfileDTO | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New user form state
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'guest' as UserRole,
  });

  // Filter & Search
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.phone && u.phone.includes(q));

      const matchesRole = selectedRole === 'all' || u.role === selectedRole;

      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, selectedRole]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  // Handle Toggle Role
  const handleConfirmRoleChange = () => {
    if (!roleChangeUser) return;

    const nextRole: UserRole = roleChangeUser.role === 'admin' ? 'guest' : 'admin';

    setUsers((prev) =>
      prev.map((u) => (u.id === roleChangeUser.id ? { ...u, role: nextRole } : u))
    );

    showToast({
      type: 'success',
      title: 'Security Privileges Updated',
      message: `${roleChangeUser.name} is now designated as ${nextRole.toUpperCase()}.`,
    });

    setRoleChangeUser(null);
  };

  // Handle Delete User
  const handleConfirmDelete = () => {
    if (!deletingUser) return;

    setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id));

    showToast({
      type: 'warning',
      title: 'Member Profile Removed',
      message: `${deletingUser.name} was removed from the active user registry.`,
    });

    setDeletingUser(null);
  };

  // Handle Add New User
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();

    const created: UserProfileDTO = {
      id: `user-${Date.now()}`,
      name: newUserForm.name,
      email: newUserForm.email,
      phone: newUserForm.phone || '+1 (555) 000-0000',
      role: newUserForm.role,
      avatarUrl: undefined,
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [created, ...prev]);

    showToast({
      type: 'success',
      title: 'Member Account Created',
      message: `Profile registered for ${created.name} (${created.role}).`,
    });

    setIsAddModalOpen(false);
    setNewUserForm({ name: '', email: '', phone: '', role: 'guest' });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedRole('all');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-lg">
      {/* Search & Actions Toolbar */}
      <div className="rounded-xl border border-border bg-background-elevated p-md shadow-sm space-y-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-md">
          {/* Search Box */}
          <div className="flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Search by name, email, or telephone..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>

          {/* Action Button: Add User */}
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Register Profile
          </Button>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-sm pt-xs border-t border-border/60">
          <div className="w-44">
            <Select
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setCurrentPage(1);
              }}
              options={[
                { value: 'all', label: 'All Roles' },
                { value: 'admin', label: 'Administrators' },
                { value: 'guest', label: 'VIP Guests' },
              ]}
            />
          </div>

          {(searchQuery || selectedRole !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
              className="text-caption text-charcoal-500 hover:text-charcoal-900"
            >
              Reset Filters
            </Button>
          )}

          <div className="ml-auto text-caption text-charcoal-400">
            Total Members: <strong className="text-charcoal-900">{filteredUsers.length}</strong>
          </div>
        </div>
      </div>

      {/* Users Table */}
      {filteredUsers.length === 0 ? (
        <div className="rounded-xl border border-border bg-background-elevated p-xl shadow-sm">
          <EmptyState
            title="No Users Located"
            description="No profiles match the active search query or role filter criteria."
            actionLabel="Reset View"
            onAction={handleResetFilters}
          />
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-background-elevated shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-body-sm">
              <thead className="bg-background-subtle border-b border-border text-[11px] font-bold uppercase tracking-wider text-charcoal-500">
                <tr>
                  <th className="py-sm px-md">Member Profile</th>
                  <th className="py-sm px-md">Contact</th>
                  <th className="py-sm px-md">Access Role</th>
                  <th className="py-sm px-md">Member Since</th>
                  <th className="py-sm px-md text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {paginatedUsers.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-background-subtle/60 transition-colors"
                  >
                    {/* User Avatar + Name */}
                    <td className="py-sm px-md">
                      <div className="flex items-center gap-sm">
                        <Avatar
                          src={u.avatarUrl}
                          name={u.name}
                          size="md"
                          className="shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-charcoal-900 truncate">
                            {u.name}
                          </p>
                          <p className="text-[11px] text-charcoal-400 font-mono">
                            ID: {u.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact info */}
                    <td className="py-sm px-md text-caption text-charcoal-600">
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3 w-3 text-charcoal-400" />
                        <span>{u.email}</span>
                      </div>
                      {u.phone && (
                        <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-charcoal-400">
                          <Phone className="h-3 w-3 text-charcoal-400" />
                          <span>{u.phone}</span>
                        </div>
                      )}
                    </td>

                    {/* Role */}
                    <td className="py-sm px-md whitespace-nowrap">
                      {u.role === 'admin' ? (
                        <Badge variant="luxury" size="sm">
                          <ShieldCheck className="h-3 w-3 mr-1" />
                          Administrator
                        </Badge>
                      ) : (
                        <Badge variant="outline" size="sm">
                          <UserCheck className="h-3 w-3 mr-1" />
                          VIP Guest
                        </Badge>
                      )}
                    </td>

                    {/* Joined Date */}
                    <td className="py-sm px-md whitespace-nowrap text-caption text-charcoal-500">
                      {new Date(u.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-sm px-md text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-xs">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setRoleChangeUser(u)}
                          className="h-8 px-2 text-[11px] text-charcoal-600 hover:text-gold-700"
                          title="Modify Access Role"
                        >
                          Change Role
                        </Button>

                        <button
                          type="button"
                          onClick={() => setDeletingUser(u)}
                          className="text-charcoal-400 hover:text-error rounded p-1.5 transition-colors"
                          title="Remove User"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="p-md border-t border-border flex items-center justify-between">
              <span className="text-caption text-charcoal-500">
                Page {currentPage} of {totalPages}
              </span>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      )}

      {/* Role Change Modal */}
      {roleChangeUser && (
        <Modal
          isOpen={!!roleChangeUser}
          onClose={() => setRoleChangeUser(null)}
          title="Change Security Role"
        >
          <div className="space-y-md text-left pt-xs">
            <p className="text-body-sm text-charcoal-700">
              Update console permissions for{' '}
              <strong className="text-charcoal-900">{roleChangeUser.name}</strong>.
            </p>

            <div className="rounded-lg bg-background-subtle p-md border border-border space-y-xs">
              <div className="text-caption text-charcoal-500">Current Role:</div>
              <div className="font-semibold text-charcoal-900 capitalize">
                {roleChangeUser.role}
              </div>
              <div className="text-caption text-gold-700 pt-xs">
                ✦ Will transition to:{' '}
                <strong>
                  {roleChangeUser.role === 'admin' ? 'VIP Guest' : 'Administrator'}
                </strong>
              </div>
            </div>

            <div className="flex justify-end gap-sm pt-sm">
              <Button
                variant="outline"
                size="md"
                onClick={() => setRoleChangeUser(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleConfirmRoleChange}
              >
                Confirm Role Update
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete User Modal */}
      {deletingUser && (
        <Modal
          isOpen={!!deletingUser}
          onClose={() => setDeletingUser(null)}
          title="Remove Member Profile"
        >
          <div className="space-y-md text-left pt-xs">
            <p className="text-body-sm text-charcoal-600">
              Are you sure you want to remove profile{' '}
              <strong className="text-charcoal-900">{deletingUser.name}</strong> (
              {deletingUser.email}) from the resort database?
            </p>
            <div className="rounded-lg bg-error-light/30 border border-error-border p-sm text-[12px] text-error">
              ✦ This action will remove access privileges immediately in this simulated administrative session.
            </div>

            <div className="flex justify-end gap-sm pt-sm">
              <Button
                variant="outline"
                size="md"
                onClick={() => setDeletingUser(null)}
              >
                Keep Profile
              </Button>
              <Button
                variant="danger"
                size="md"
                onClick={handleConfirmDelete}
              >
                Confirm Deletion
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add New User Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Register New Member Profile"
        >
          <form onSubmit={handleCreateUser} className="space-y-md text-left pt-xs">
            <div>
              <label className="text-caption font-semibold text-charcoal-700 block mb-1">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="e.g. Lady Vivienne Montgomery"
                value={newUserForm.name}
                onChange={(e) =>
                  setNewUserForm({ ...newUserForm, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="text-caption font-semibold text-charcoal-700 block mb-1">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="e.g. vivienne@montgomery.co.uk"
                value={newUserForm.email}
                onChange={(e) =>
                  setNewUserForm({ ...newUserForm, email: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-md">
              <div>
                <label className="text-caption font-semibold text-charcoal-700 block mb-1">
                  Phone Number
                </label>
                <Input
                  type="text"
                  placeholder="+44 20 7946 0000"
                  value={newUserForm.phone}
                  onChange={(e) =>
                    setNewUserForm({ ...newUserForm, phone: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-caption font-semibold text-charcoal-700 block mb-1">
                  Assigned Role
                </label>
                <Select
                  value={newUserForm.role}
                  onChange={(e) =>
                    setNewUserForm({
                      ...newUserForm,
                      role: e.target.value as UserRole,
                    })
                  }
                  options={[
                    { value: 'guest', label: 'VIP Guest' },
                    { value: 'admin', label: 'Administrator' },
                  ]}
                />
              </div>
            </div>

            <div className="flex justify-end gap-sm pt-md border-t border-border">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md">
                Register Profile
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
