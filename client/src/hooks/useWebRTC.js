import { useState, useEffect, useRef, useCallback } from 'react'
import { dummyRemoteParticipants } from '../assets/asset'
import toast from 'react-hot-toast'


const useWebRTC = (_roomId, user, onMeetingEnded, _enabled = true) => {
    const [localStream, setLocalStream] = useState(null)
    const [remoteUsers, setRemoteUsers] = useState(dummyRemoteParticipants)
    const [audioEnabled, setAudioEnabled] = useState(true)
    const [videoEnabled, setVideoEnabled] = useState(true)

    const localStreamRef = useRef(null)

    const initLocalStream = useCallback(async () => {
        try {
            if (navigator?.mediaDevices?.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                })

                setLocalStream(stream)
                localStreamRef.current = stream

                return stream
            }
        } catch (error) {
            console.log(
                'MockWebRTC: Running in camera preview fallback mode',
                error
            )
        }

        return null
    }, [])

    // Initialize local camera/microphone
    useEffect(() => {
        if (!_enabled) return

        initLocalStream()

        // Cleanup when component unmounts
        return () => {
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach((track) => {
                    track.stop()
                })

                localStreamRef.current = null
            }
        }
    }, [_enabled, initLocalStream])

    // Toggle local microphone
    const toggleAudio = () => {
        const newState = !audioEnabled

        setAudioEnabled(newState)

        if (localStreamRef.current) {
            const audioTrack = localStreamRef.current.getAudioTracks()[0]

            if (audioTrack) {
                audioTrack.enabled = newState
            }
        }

        toast(
            newState ? 'Microphone turned on' : 'Microphone muted',
            {
                icon: newState ? '🎙️' : '🎙️🚫',
            }
        )
    }

    // Toggle local camera
    const toggleVideo = () => {
        const newState = !videoEnabled

        setVideoEnabled(newState)

        if (localStreamRef.current) {
            const videoTrack = localStreamRef.current.getVideoTracks()[0]

            if (videoTrack) {
                videoTrack.enabled = newState
            }
        }

        toast(
            newState ? 'Camera turned on' : 'Camera disabled',
            {
                icon: newState ? '📹' : '📹🚫',
            }
        )
    }

    // End meeting for everyone
    const endMeeting = useCallback(() => {
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach((track) => {
                track.stop()
            })

            localStreamRef.current = null
            setLocalStream(null)
        }

        if (onMeetingEnded) {
            onMeetingEnded('Meeting ended')
        }
    }, [onMeetingEnded])

    return {
        localStream,
        remoteUsers,
        audioEnabled,
        videoEnabled,
        toggleAudio,
        toggleVideo,
        endMeeting,
        initLocalStream,
    }
}

export default useWebRTC
