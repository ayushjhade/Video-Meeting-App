import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react'
import {dummySessions} from '../assets/asset'
import EmptySessions from '../components/sessions/EmptySessions'
import SessionCard from '../components/sessions/SessionCard'

const Sessions = () => {

  const [sessions] = useState(dummySessions)
  const [selectedSession, setSelectedSession] = useState(null)
  const navigate = useNavigate()

  const openSessionDetails = (sessionID) => {
    const session = session.find((s)=>s.id===sessionId || s.meetingId === sessionID)
    if(session ){
      setSelectedSession(session);
    }
  }

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

      {/*Session grid / empty state */}
      {
        sessions.length ==0 ? (
          <EmptySessions/>
        ):(
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {sessions.map((session)=>(
              <SessionCard
            key={session.id}
            session={session}
            onOpenDetails={openSessionDetails}
            onRejoin={(meetingId)=>navigate(`/meeting/${meetingId}`)}/>
            ))}
          </div>
        )
      }

    </main>
  )
}

export default Sessions