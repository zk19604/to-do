
import Tasks from './Tasks.jsx'

const person = {
  name : 'Zainab Khalil'
}
function App() {
  return (
   <div>
   <h1>{person.name}</h1> 
    <Tasks />
   </div>
  )
}

export default App
