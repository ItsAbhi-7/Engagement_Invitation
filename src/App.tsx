import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { defaultInvitation } from '@/config/defaultInvitation'
import { InvitationPage } from '@/pages/InvitationPage'
import { AdminLogin } from '@/pages/admin/AdminLogin'
import { AdminDashboard } from '@/pages/admin/AdminDashboard'
import { AdminEditor } from '@/pages/admin/AdminEditor'

export default function App() {
  const invitePath = `/i/${defaultInvitation.slug}`

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={invitePath} replace />} />
        <Route path="/i/:slug" element={<InvitationPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/edit/:slug" element={<AdminEditor />} />
        <Route path="*" element={<Navigate to={invitePath} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
