'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  MessageSquareQuote,
  Star,
  Trash2,
  Eye,
  RotateCcw,
  User,
  Globe,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { Review } from '@/types/review';
import { Rating } from '@/components/ui/Rating';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { useToast } from '@/components/ui/Toast';

interface AdminReviewsTableProps {
  initialReviews: Review[];
}

export function AdminReviewsTable({ initialReviews }: AdminReviewsTableProps) {
  const { showToast } = useToast();

  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Modals state
  const [inspectingReview, setInspectingReview] = useState<Review | null>(null);
  const [deletingReview, setDeletingReview] = useState<Review | null>(null);

  // Filter & Search
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        r.userName.toLowerCase().includes(q) ||
        r.comment.toLowerCase().includes(q) ||
        (r.userCountry && r.userCountry.toLowerCase().includes(q)) ||
        r.roomId.toLowerCase().includes(q);

      const matchesRating =
        selectedRating === 'all'
          ? true
          : selectedRating === '5'
          ? r.rating === 5
          : selectedRating === '4'
          ? r.rating === 4
          : r.rating <= 3;

      return matchesSearch && matchesRating;
    });
  }, [reviews, searchQuery, selectedRating]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / pageSize));
  const paginatedReviews = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredReviews.slice(start, start + pageSize);
  }, [filteredReviews, currentPage, pageSize]);

  // Handle Delete Review
  const handleConfirmDelete = () => {
    if (!deletingReview) return;

    setReviews((prev) => prev.filter((r) => r.id !== deletingReview.id));

    showToast({
      type: 'warning',
      title: 'Review Moderated',
      message: `Review submitted by ${deletingReview.userName} was removed from the live website.`,
    });

    setDeletingReview(null);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedRating('all');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-lg">
      {/* Search & Filter Toolbar */}
      <div className="rounded-xl border border-border bg-background-elevated p-md shadow-sm space-y-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-md">
          {/* Search Box */}
          <div className="flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Search by reviewer name, room, or review keywords..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>

          <div className="text-caption text-charcoal-400">
            Total Reviews: <strong className="text-charcoal-900">{filteredReviews.length}</strong>
          </div>
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap items-center gap-sm pt-xs border-t border-border/60">
          <div className="w-48">
            <Select
              value={selectedRating}
              onChange={(e) => {
                setSelectedRating(e.target.value);
                setCurrentPage(1);
              }}
              options={[
                { value: 'all', label: 'All Star Ratings' },
                { value: '5', label: '5 Stars (Flawless)' },
                { value: '4', label: '4 Stars (Very Good)' },
                { value: '3', label: '3 Stars & Below' },
              ]}
            />
          </div>

          {(searchQuery || selectedRating !== 'all') && (
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
        </div>
      </div>

      {/* Reviews Table */}
      {filteredReviews.length === 0 ? (
        <div className="rounded-xl border border-border bg-background-elevated p-xl shadow-sm">
          <EmptyState
            title="No Reviews Found"
            description="No customer testimonials match your current keywords or star rating filter."
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
                  <th className="py-sm px-md">Guest Reviewer</th>
                  <th className="py-sm px-md">Room Code</th>
                  <th className="py-sm px-md">Rating</th>
                  <th className="py-sm px-md">Testimonial Excerpt</th>
                  <th className="py-sm px-md">Stay Date</th>
                  <th className="py-sm px-md text-right">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {paginatedReviews.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-background-subtle/60 transition-colors"
                  >
                    {/* Guest */}
                    <td className="py-sm px-md">
                      <div className="flex items-center gap-sm">
                        <Avatar
                          src={r.userAvatar}
                          name={r.userName}
                          size="sm"
                          className="shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-charcoal-900 truncate">
                            {r.userName}
                          </p>
                          {r.userCountry && (
                            <p className="text-[11px] text-charcoal-400 flex items-center gap-1">
                              <Globe className="h-3 w-3" />
                              <span>{r.userCountry}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Room ID */}
                    <td className="py-sm px-md whitespace-nowrap">
                      <span className="font-mono text-caption text-charcoal-700 bg-background-subtle px-1.5 py-0.5 rounded border border-border">
                        {r.roomId}
                      </span>
                    </td>

                    {/* Rating */}
                    <td className="py-sm px-md whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Rating value={r.rating} readOnly size="sm" />
                        <span className="text-caption font-bold text-charcoal-800 ml-1">
                          {r.rating}.0
                        </span>
                      </div>
                    </td>

                    {/* Excerpt */}
                    <td className="py-sm px-md max-w-xs">
                      <p className="text-caption text-charcoal-600 line-clamp-2">
                        &ldquo;{r.comment}&rdquo;
                      </p>
                    </td>

                    {/* Stay Date */}
                    <td className="py-sm px-md whitespace-nowrap text-caption text-charcoal-500">
                      <div>{r.stayDate}</div>
                      <div className="text-[11px] text-charcoal-400">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-sm px-md text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-xs">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setInspectingReview(r)}
                          className="h-8 px-2 text-charcoal-600 hover:text-gold-700"
                          leftIcon={<Eye className="h-3.5 w-3.5" />}
                        >
                          Read
                        </Button>

                        <button
                          type="button"
                          onClick={() => setDeletingReview(r)}
                          className="text-charcoal-400 hover:text-error rounded p-1.5 transition-colors"
                          title="Delete Review"
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

      {/* Review Full Inspection Modal */}
      {inspectingReview && (
        <Modal
          isOpen={!!inspectingReview}
          onClose={() => setInspectingReview(null)}
          title="Guest Review Inspection"
        >
          <div className="space-y-md text-left pt-xs">
            {/* Reviewer info */}
            <div className="flex items-center gap-md p-sm rounded-lg bg-background-subtle border border-border">
              <Avatar
                src={inspectingReview.userAvatar}
                name={inspectingReview.userName}
                size="md"
              />
              <div>
                <p className="font-semibold text-charcoal-900 text-body-sm">
                  {inspectingReview.userName}
                </p>
                <p className="text-caption text-charcoal-500">
                  {inspectingReview.userCountry || 'International Traveler'} • Stayed in {inspectingReview.stayDate}
                </p>
              </div>
            </div>

            {/* Rating scorecard */}
            <div className="flex items-center justify-between p-sm rounded-lg border border-border">
              <span className="text-body-sm font-semibold text-charcoal-800">
                Overall Hospitality Score:
              </span>
              <div className="flex items-center gap-1.5">
                <Rating value={inspectingReview.rating} readOnly size="md" />
                <span className="font-serif font-bold text-h4 text-gold-700 ml-1">
                  {inspectingReview.rating}/5
                </span>
              </div>
            </div>

            {/* Comment Body */}
            <div className="rounded-lg bg-background-subtle p-md space-y-xs border border-border">
              <div className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400">
                Full Written Feedback
              </div>
              <p className="text-body-sm italic text-charcoal-800 leading-relaxed font-serif">
                &ldquo;{inspectingReview.comment}&rdquo;
              </p>
            </div>

            <div className="flex justify-between items-center pt-xs text-caption text-charcoal-400">
              <span>Suite Target: <strong className="text-charcoal-700">{inspectingReview.roomId}</strong></span>
              <span>Submitted: {new Date(inspectingReview.createdAt).toLocaleString()}</span>
            </div>

            <div className="flex justify-end gap-sm pt-sm border-t border-border">
              <Button
                variant="outline"
                size="md"
                onClick={() => setInspectingReview(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deletingReview && (
        <Modal
          isOpen={!!deletingReview}
          onClose={() => setDeletingReview(null)}
          title="Confirm Review Removal"
        >
          <div className="space-y-md text-left pt-xs">
            <p className="text-body-sm text-charcoal-600">
              Are you sure you want to remove the review submitted by{' '}
              <strong className="text-charcoal-900">{deletingReview.userName}</strong>?
            </p>
            <div className="rounded-lg bg-error-light/30 border border-error-border p-sm text-[12px] text-error">
              ✦ This will unpublish this review from all public room pages in this simulated administrative session.
            </div>

            <div className="flex justify-end gap-sm pt-sm">
              <Button
                variant="outline"
                size="md"
                onClick={() => setDeletingReview(null)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="md"
                onClick={handleConfirmDelete}
              >
                Delete Review
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
