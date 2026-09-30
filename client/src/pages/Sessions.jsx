import React from 'react'
import { Link} from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react'

const Sessions = () => {
  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-12">
      {/* page title & Navigation header*/}
      <Link to="/dashboard" className="flex items-center text-sm gap-1 mb-4 text-slate-500 hover:text-slate-900 transition-colors">
        <ArrowLeftIcon size={14}/>Go to Dashboard
      </Link>
      <div className="mb-8">
        <h1 className='text-3xl font-medium tracking-tight text-slate-900'>Meeting sessionns.
        </h1>
        <p className='text-sm text-slate-500 mt-1'>Review your past and active meeting history, participant logs, and chat transcripts.</p>

      </div>

    </main>
  )
}

export default Sessions