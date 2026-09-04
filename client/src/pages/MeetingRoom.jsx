import React, { useCallback, useState } from 'react'
import { dummyMeetingDetails, dummyUser } from '../assets/asset'
import { useNavigate, useParams } from 'react-router-dom'
import VideoGrid from '../components/meeting/VideoGrid'
import useWebRTC from '../hooks/useWebRTC'

const MeetingRoom = () => {
  const { meetingId } = useParams()
  const navigate = useNavigate()

  const userdata = dummyUser

  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false)

  // Currently hard-coded.
  // Later, this can come from your backend/database.
  const isHost = true

  const handleMeetingEnd = useCallback(() => {
    navigate('/dashboard')
  }, [navigate])

  // WebRTC
  const {
    localStream,
    remoteUsers,
    audioEnabled,
    videoEnabled,
    toggleAudio,
    toggleVideo,
    endMeeting,
  } = useWebRTC(
    meetingId,
    userdata,
    handleMeetingEnd
  )

  // Leave meeting
  const handleLeave = () => {
    navigate('/dashboard')
  }

  // End meeting for everyone
  const handleEndMeeting = () => {
    if (isHost) {
      endMeeting()
    } else {
      handleLeave()
    }
  }

  return (
    <div className="h-screen w-screen bg-slate-100 text-slate-900 flex flex-col overflow-hidden relative font-sans">

      {/* Top Bar */}
      <header className="w-full bg-white/90 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between z-30 shadow-xs">

        {/* Meeting Information */}
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-lg">
            {dummyMeetingDetails.title} (
            {meetingId || dummyMeetingDetails.meetingId}
            )
          </h2>

          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Participants Button */}
        <button
          onClick={() =>
            setIsParticipantsOpen((prev) => !prev)
          }
          className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition"
        >
          Participants
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* Video Grid */}
        <VideoGrid
          localStream={localStream}
          localUser={userdata}
          remoteUsers={remoteUsers}
          audioEnabled={audioEnabled}
          videoEnabled={videoEnabled}
        />

        {/* Participants Drawer */}
        {isParticipantsOpen && (
          <aside className="absolute right-0 top-0 h-full w-80 bg-white border-l border-slate-200 shadow-xl z-20">
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-4">
                Participants
              </h3>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-slate-100">
                  {userdata.name || 'You'}
                </div>

                {remoteUsers.map((participant) => (
                  <div
                    key={participant.id}
                    className="p-3 rounded-lg bg-slate-100"
                  >
                    {participant.name || 'Participant'}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Bottom Control Bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
          <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-slate-200">

            {/* Microphone */}
            <button
              onClick={toggleAudio}
              className={`px-4 py-3 rounded-xl transition ${
                audioEnabled
                  ? 'bg-slate-100 hover:bg-slate-200'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {audioEnabled ? '🎙️' : '🔇'}
            </button>

            {/* Camera */}
            <button
              onClick={toggleVideo}
              className={`px-4 py-3 rounded-xl transition ${
                videoEnabled
                  ? 'bg-slate-100 hover:bg-slate-200'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {videoEnabled ? '📹' : '📹🚫'}
            </button>

            {/* Leave / End Meeting */}
            <button
              onClick={handleEndMeeting}
              className="px-5 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition font-medium"
            >
              {isHost ? 'End Meeting' : 'Leave Meeting'}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default MeetingRoom