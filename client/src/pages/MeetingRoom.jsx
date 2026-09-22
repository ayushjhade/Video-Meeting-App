import React from 'react'
import { dummyMeetingDetails, dummyUser } from '../assets/asset'
import { useNavigate, useParams } from 'react-router-dom'
import { useCallback } from 'react'
import { useState } from 'react'
import VideoGrid from '../components/meeting/VideoGrid'
import useWebRTC from '../hooks/useWebRTC'
import ChatPanel from '../components/meeting/ChatPanel'
import { useChat } from '../hooks/useChat'
import ParticipantList from '../components/meeting/ParticipantList'

const MeetingRoom = () => {
  const {meetingId} = useParams()
  const navigate = useNavigate()
  const userdata = dummyUser;

  const[isParticipantsOpen, setIsParticipantsOpen] = useState(false)

  const handleMeetingEnd = useCallback(() => {
    navigate('/dashboard')
  }, [navigate])

  // Initialize WebRTC hook
  const{localStream, remoteUsers, audioEnabled, videoEnabled, toggleAudio,toggleVideo,endMeeting} = useWebRTC(meetingId,userdata, handleMeetingEnd)
  
  // Initialize Chat
  const{messages, sendMessage, unreadCount, isChatOpen, toggleChat} = useChat(meetingId,userdata)
  
  const isHost = true;

  const handleLeave = () => {

  }

  const handleEndMeeting=() =>{

  }

  return (
    <div className="h-screen w-screen bg-slate-100  text-slate-900 flex flex-col overflow-hidden relative font-sans">
        {/* Top Bar */}
        <header className="w-full bg-white/90 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <h2>
              {dummyMeetingDetails.title}({meetingId|| dummyMeetingDetails.meetingId})
            </h2>
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"/>
          </div>
        </header>

        {/* Main Content Area (video grid + side panels*/}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Video Grid Center */}
          <VideoGrid
          localStream={localStream}
          localUser={userdata}
          remoteUsers={remoteUsers}
          audioEnabled={audioEnabled}
          videoEnabled={videoEnabled}/>
          

          {/*In Meeting chat Drawer*/}
          <ChatPanel
          isOpen={isChatOpen}
          onClose={toggleChat}
          messages={messages}
          onSendMessage={sendMessage}
          currentUser={userdata}
          />

          {/*Participants Drawer*/}
          <ParticipantList
          isOpen={isParticipantsOpen}
          onClose={() => setIsParticipantsOpen}
          localUser={userdata}
          localAudio ={audioEnabled}
          localVideo={videoEnabled}
          remoteUsers = {remoteUsers}
          meetingHostId = {dummyUser.id}
          />

          {/* Bottom Floating Control Bar */}
        </div>
    </div>
  )
}

export default MeetingRoom