"use client";

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import AdminDashboardContent from './AdminDashboardContent';

export default function AdminPage() {
  return (
    <AuthProvider>
      <AdminDashboardContent />
    </AuthProvider>
  );
}