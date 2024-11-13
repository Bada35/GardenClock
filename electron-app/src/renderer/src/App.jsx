import Clock from './Clock.jsx';

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <Clock />
    </>
  )
}

export default App

