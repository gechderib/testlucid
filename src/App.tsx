import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FormulaInput from './components/FormulaInput'

function App() {

  const queryClient = new QueryClient();

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <FormulaInput/>
    </QueryClientProvider>
    </>
  )
}

export default App
