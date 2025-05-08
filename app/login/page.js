"use client";

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
}