import Profile from "./pages/Profile";

// ...
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route
    path="/vender"
    element={
      <PrivateRoute>
        <Sell />
      </PrivateRoute>
    }
  />
  <Route
    path="/perfil"
    element={
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    }
  />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
</Routes>
