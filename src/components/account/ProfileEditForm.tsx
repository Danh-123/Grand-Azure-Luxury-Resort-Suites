'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileEditSchema, ProfileEditFormData } from '@/schemas/user.schema';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from '@/components/ui/Toast';
import { FormField } from '@/components/form/FormField';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { User, Mail, Phone, Upload, ArrowLeft, Check } from 'lucide-react';

export function ProfileEditForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(user?.avatarUrl);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileEditFormData>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      avatarUrl: user?.avatarUrl || '',
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
      setValue('avatarUrl', previewUrl, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: ProfileEditFormData) => {
    // Simulated saving delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (user) {
      setUser({
        ...user,
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        avatarUrl: data.avatarUrl || avatarPreview || user.avatarUrl,
      });
    }

    showToast({
      type: 'success',
      title: 'Profile Saved',
      message: 'Your personal information and preferences have been updated successfully.',
    });

    router.push('/profile');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-xl">
      {/* Header */}
      <div className="space-y-xs">
        <h2 className="text-h2 font-serif font-bold text-charcoal-900">
          Edit Profile Information
        </h2>
        <p className="text-body text-charcoal-600 font-light">
          Keep your guest credentials accurate for expedited check-in and bespoke butler services.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-xl">
        <div className="rounded-2xl border border-border bg-background-elevated p-lg sm:p-xl space-y-xl shadow-sm">
          {/* Avatar Upload UI */}
          <div className="flex flex-col sm:flex-row items-center gap-lg border-b border-border pb-lg">
            <Avatar
              src={avatarPreview}
              name={user?.name}
              size="xl"
              className="ring-4 ring-gold-500/20 shadow-md"
            />

            <div className="space-y-xs text-center sm:text-left">
              <h4 className="text-body-sm font-semibold text-charcoal-900">
                Profile Portrait
              </h4>
              <p className="text-caption text-charcoal-500">
                JPG, PNG or WEBP up to 5MB. Visible on guest vouchers and feedback.
              </p>

              <div className="pt-xs">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  leftIcon={<Upload className="h-3.5 w-3.5" />}
                >
                  Change Photo
                </Button>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-md">
            {/* Full Name */}
            <FormField
              label="Full Legal Name"
              name="name"
              error={errors.name}
              required
            >
              <Input
                {...register('name')}
                placeholder="Lord Julian Montgomery"
                leftIcon={<User className="h-4 w-4" />}
              />
            </FormField>

            {/* Email Address */}
            <FormField
              label="Email Address"
              name="email"
              error={errors.email}
              required
              helperText="Official itineraries and billing statements are delivered here."
            >
              <Input
                type="email"
                {...register('email')}
                placeholder="member@domain.com"
                leftIcon={<Mail className="h-4 w-4" />}
              />
            </FormField>

            {/* Phone Number */}
            <FormField
              label="Phone Number"
              name="phone"
              error={errors.phone}
              helperText="For concierge messaging and arrival coordination."
            >
              <Input
                type="tel"
                {...register('phone')}
                placeholder="+1 555-019-2834"
                leftIcon={<Phone className="h-4 w-4" />}
              />
            </FormField>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-sm">
          <Link href="/profile">
            <Button
              type="button"
              variant="outline"
              size="lg"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Cancel
            </Button>
          </Link>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            leftIcon={<Check className="h-4 w-4" />}
            className="font-serif font-bold shadow-glow"
          >
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

