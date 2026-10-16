'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BedDouble,
  DollarSign,
  Layers,
} from 'lucide-react';
import { RoomCardDTO } from '@/types/dto/room.dto';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/components/ui/Toast';

interface AdminRoomsTableProps {
  initialRooms: RoomCardDTO[];
}

export function AdminRoomsTable({ initialRooms }: AdminRoomsTableProps) {
  const { showToast } = useToast();

  const [rooms, setRooms] = useState<RoomCardDTO[]>(initialRooms);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Modals state
  const [editingRoom, setEditingRoom] = useState<RoomCardDTO | null>(null);
  const [deletingRoom, setDeletingRoom] = useState<RoomCardDTO | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form edit state
  const [editForm, setEditForm] = useState<{
    name: string;
    pricePerNight: number;
    bedType: string;
    isAvailable: boolean;
  }>({
    name: '',
    pricePerNight: 0,
    bedType: 'King',
    isAvailable: true,
  });

  // Filtered & Searched rooms
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesSearch =
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.roomType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === 'all' || room.roomType === selectedType;

      const matchesAvailability =
        selectedAvailability === 'all'
          ? true
          : selectedAvailability === 'available'
          ? room.isAvailable
          : !room.isAvailable;

      return matchesSearch && matchesType && matchesAvailability;
    });
  }, [rooms, searchQuery, selectedType, selectedAvailability]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredRooms.length / pageSize));
  const paginatedRooms = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRooms.slice(start, start + pageSize);
  }, [filteredRooms, currentPage, pageSize]);

  // Open Edit Modal
  const handleOpenEdit = (room: RoomCardDTO) => {
    setEditingRoom(room);
    setEditForm({
      name: room.name,
      pricePerNight: room.pricePerNight,
      bedType: room.bedType,
      isAvailable: room.isAvailable,
    });
  };

  // Save Edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoom) return;

    setRooms((prev) =>
      prev.map((r) =>
        r.id === editingRoom.id
          ? {
              ...r,
              name: editForm.name,
              pricePerNight: Number(editForm.pricePerNight),
              bedType: editForm.bedType as any,
              isAvailable: editForm.isAvailable,
            }
          : r
      )
    );

    showToast({
      type: 'success',
      title: 'Suite Inventory Updated',
      message: `${editForm.name} configuration saved successfully.`,
    });

    setEditingRoom(null);
  };

  // Quick Toggle Availability
  const handleToggleAvailability = (room: RoomCardDTO) => {
    const newStatus = !room.isAvailable;
    setRooms((prev) =>
      prev.map((r) => (r.id === room.id ? { ...r, isAvailable: newStatus } : r))
    );

    showToast({
      type: 'info',
      title: 'Availability Status Updated',
      message: `${room.name} is now ${newStatus ? 'Available for bookings' : 'Marked as Unavailable'}.`,
    });
  };

  // Delete Room
  const handleConfirmDelete = () => {
    if (!deletingRoom) return;

    setRooms((prev) => prev.filter((r) => r.id !== deletingRoom.id));

    showToast({
      type: 'warning',
      title: 'Suite Removed',
      message: `${deletingRoom.name} was successfully removed from live inventory.`,
    });

    setDeletingRoom(null);
  };

  // Add Room (Local Mock)
  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `room-${Date.now()}`;
    const newRoom: RoomCardDTO = {
      id: newId,
      name: editForm.name || 'New Grand Azure Villa',
      slug: (editForm.name || 'new-villa').toLowerCase().replace(/\s+/g, '-'),
      thumbnailUrl:
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      pricePerNight: Number(editForm.pricePerNight) || 850,
      currency: 'USD',
      rating: 5.0,
      reviewCount: 0,
      capacity: { adults: 2, children: 1 },
      roomType: 'suite',
      bedType: 'King',
      sizeSqm: 120,
      isAvailable: true,
      featured: false,
    };

    setRooms((prev) => [newRoom, ...prev]);

    showToast({
      type: 'success',
      title: 'New Suite Provisioned',
      message: `${newRoom.name} added to inventory catalog.`,
    });

    setIsAddModalOpen(false);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedAvailability('all');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-lg">
      {/* Search & Filter Toolbar */}
      <div className="rounded-xl border border-border bg-background-elevated p-md shadow-sm space-y-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-md">
          {/* Search Box */}
          <div className="flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Search by suite name or type..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>

          {/* Action Button: Add Suite */}
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              setEditForm({
                name: '',
                pricePerNight: 850,
                bedType: 'King',
                isAvailable: true,
              });
              setIsAddModalOpen(true);
            }}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Add New Suite
          </Button>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-sm pt-xs border-t border-border/60">
          <div className="w-48">
            <Select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
              }}
              options={[
                { value: 'all', label: 'All Room Types' },
                { value: 'presidential', label: 'Presidential Villas' },
                { value: 'penthouse', label: 'Penthouse Suites' },
                { value: 'suite', label: 'Oceanfront Suites' },
                { value: 'deluxe', label: 'Garden Deluxe' },
              ]}
            />
          </div>

          <div className="w-44">
            <Select
              value={selectedAvailability}
              onChange={(e) => {
                setSelectedAvailability(e.target.value);
                setCurrentPage(1);
              }}
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'available', label: 'Available Only' },
                { value: 'unavailable', label: 'Occupied / Inactive' },
              ]}
            />
          </div>

          {(searchQuery || selectedType !== 'all' || selectedAvailability !== 'all') && (
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
            Showing <strong className="text-charcoal-800">{filteredRooms.length}</strong> suites
          </div>
        </div>
      </div>

      {/* Rooms Table or Empty State */}
      {filteredRooms.length === 0 ? (
        <div className="rounded-xl border border-border bg-background-elevated p-xl shadow-sm">
          <EmptyState
            title="No Suites Found"
            description="No suites in the inventory match your active search terms or category filters."
            actionLabel="Reset Search Filters"
            onAction={handleResetFilters}
          />
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-background-elevated shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-body-sm">
              <thead className="bg-background-subtle border-b border-border text-[11px] font-bold uppercase tracking-wider text-charcoal-500">
                <tr>
                  <th className="py-sm px-md">Suite / Room</th>
                  <th className="py-sm px-md">Tier / Category</th>
                  <th className="py-sm px-md">Specs</th>
                  <th className="py-sm px-md">Rate / Night</th>
                  <th className="py-sm px-md">Availability</th>
                  <th className="py-sm px-md text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {paginatedRooms.map((room) => (
                  <tr
                    key={room.id}
                    className="hover:bg-background-subtle/60 transition-colors"
                  >
                    {/* Suite Name + Thumbnail */}
                    <td className="py-sm px-md">
                      <div className="flex items-center gap-md">
                        <div className="relative h-12 w-16 rounded-md overflow-hidden shrink-0 border border-border">
                          <Image
                            src={room.thumbnailUrl}
                            alt={room.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div>
                          <p className="font-serif font-bold text-charcoal-900 line-clamp-1 max-w-[240px]">
                            {room.name}
                          </p>
                          <p className="text-[11px] text-charcoal-400 font-mono">
                            ID: {room.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-sm px-md whitespace-nowrap">
                      <Badge variant="luxury" size="sm" className="capitalize">
                        {room.roomType}
                      </Badge>
                    </td>

                    {/* Specs */}
                    <td className="py-sm px-md whitespace-nowrap text-caption text-charcoal-600">
                      <div>{room.bedType} Bed</div>
                      <div className="text-[11px] text-charcoal-400">
                        {room.sizeSqm} m² • Max {room.capacity.adults + room.capacity.children} guests
                      </div>
                    </td>

                    {/* Rate */}
                    <td className="py-sm px-md whitespace-nowrap">
                      <span className="font-bold text-charcoal-900">
                        ${room.pricePerNight.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-charcoal-400"> / night</span>
                    </td>

                    {/* Availability toggle */}
                    <td className="py-sm px-md whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleToggleAvailability(room)}
                        className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
                        title="Click to toggle availability"
                      >
                        {room.isAvailable ? (
                          <Badge variant="confirmed" size="sm" className="cursor-pointer">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Available
                          </Badge>
                        ) : (
                          <Badge variant="neutral" size="sm" className="cursor-pointer">
                            <XCircle className="h-3 w-3 mr-1" />
                            Occupied / Offline
                          </Badge>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-sm px-md text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-xs">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenEdit(room)}
                          className="h-8 w-8 p-0 text-charcoal-600 hover:text-gold-700"
                          title="Edit Suite"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeletingRoom(room)}
                          className="h-8 w-8 p-0 text-charcoal-400 hover:text-error"
                          title="Delete Suite"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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

      {/* Edit Room Modal */}
      {editingRoom && (
        <Modal
          isOpen={!!editingRoom}
          onClose={() => setEditingRoom(null)}
          title={`Edit Suite: ${editingRoom.name}`}
        >
          <form onSubmit={handleSaveEdit} className="space-y-md text-left pt-xs">
            <div>
              <label className="text-caption font-semibold text-charcoal-700 block mb-1">
                Suite Title
              </label>
              <Input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-md">
              <div>
                <label className="text-caption font-semibold text-charcoal-700 block mb-1">
                  Base Price ($ / night)
                </label>
                <Input
                  type="number"
                  min="100"
                  step="50"
                  value={editForm.pricePerNight}
                  onChange={(e) =>
                    setEditForm({ ...editForm, pricePerNight: Number(e.target.value) })
                  }
                  required
                />
              </div>

              <div>
                <label className="text-caption font-semibold text-charcoal-700 block mb-1">
                  Bedding Configuration
                </label>
                <Select
                  value={editForm.bedType}
                  onChange={(e) => setEditForm({ ...editForm, bedType: e.target.value })}
                  options={[
                    { value: 'King', label: 'King Bed' },
                    { value: 'Super King', label: 'Super King Bed' },
                    { value: 'Queen', label: 'Queen Bed' },
                    { value: 'Twin', label: 'Twin Beds' },
                  ]}
                />
              </div>
            </div>

            <div className="pt-xs">
              <label className="flex items-center gap-sm text-body-sm font-medium text-charcoal-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editForm.isAvailable}
                  onChange={(e) =>
                    setEditForm({ ...editForm, isAvailable: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-border text-gold-600 focus:ring-gold-500 accent-gold-600"
                />
                <span>Active & Available for Guest Reservations</span>
              </label>
            </div>

            <div className="flex justify-end gap-sm pt-md border-t border-border">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setEditingRoom(null)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md">
                Save Modifications
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Room Confirmation Modal */}
      {deletingRoom && (
        <Modal
          isOpen={!!deletingRoom}
          onClose={() => setDeletingRoom(null)}
          title="Decommission Suite"
        >
          <div className="space-y-md text-left pt-xs">
            <p className="text-body-sm text-charcoal-600">
              Are you sure you want to decommission{' '}
              <strong className="text-charcoal-900">{deletingRoom.name}</strong> from the
              active hotel catalog?
            </p>
            <div className="rounded-lg bg-error-light/30 border border-error-border p-sm text-[12px] text-error">
              ✦ This action is a simulated local deletion for this administrative session.
            </div>

            <div className="flex justify-end gap-sm pt-sm">
              <Button
                variant="outline"
                size="md"
                onClick={() => setDeletingRoom(null)}
              >
                Keep Suite
              </Button>
              <Button
                variant="danger"
                size="md"
                onClick={handleConfirmDelete}
              >
                Confirm Decommission
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add New Room Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Suite to Inventory"
        >
          <form onSubmit={handleAddRoom} className="space-y-md text-left pt-xs">
            <div>
              <label className="text-caption font-semibold text-charcoal-700 block mb-1">
                Suite Title
              </label>
              <Input
                type="text"
                placeholder="e.g. Royal Lagoon Sanctuary Villa"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-md">
              <div>
                <label className="text-caption font-semibold text-charcoal-700 block mb-1">
                  Nightly Rate (USD)
                </label>
                <Input
                  type="number"
                  min="200"
                  step="50"
                  value={editForm.pricePerNight}
                  onChange={(e) =>
                    setEditForm({ ...editForm, pricePerNight: Number(e.target.value) })
                  }
                  required
                />
              </div>

              <div>
                <label className="text-caption font-semibold text-charcoal-700 block mb-1">
                  Bed Configuration
                </label>
                <Select
                  value={editForm.bedType}
                  onChange={(e) => setEditForm({ ...editForm, bedType: e.target.value })}
                  options={[
                    { value: 'King', label: 'King Bed' },
                    { value: 'Super King', label: 'Super King Bed' },
                    { value: 'Queen', label: 'Queen Bed' },
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
                Publish Suite
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
