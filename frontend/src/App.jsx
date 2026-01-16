import { Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './components/PrivateRoute'
import MainLayout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { TaxDeductionForm } from './pages/Salary/TaxDeductionForm'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="employees" element={<div>员工管理页面</div>} />
        <Route path="attendance" element={<div>考勤打卡页面</div>} />
        <Route path="salary/tax-deduction" element={<TaxDeductionForm />} />
        <Route path="settings" element={<div>系统设置</div>} />
      </Route>
    </Routes>
  )
}

export default App