
import React from 'react'
import AppNavigator from './src/navigation/AppNavigator'
import { Provider } from 'react-redux'
import { store } from './src/workspaces/Notification/store'
import { UserProvider } from './src/services/provider/UseContext'
import { SocketProvider } from './src/services/provider/SocketContext'

const App = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <SocketProvider>
          <AppNavigator />
        </SocketProvider>
      </UserProvider>
    </Provider>
  )
}

export default App