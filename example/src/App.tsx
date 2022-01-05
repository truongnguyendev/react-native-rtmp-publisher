import React, { useRef, useState } from 'react';

import { View } from 'react-native';
import RTMPPublisher from 'react-native-rtmp';

import styles from './App.styles';

import Button from './components/Button';
import LiveBadge from './components/LiveBadge';
import usePermissions from './hooks/usePermissions';

const PUBLISH_URL = 'YOUR-PUBLISH-URL';

export default function App() {
  const publisherRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState<boolean>();
  const [isMuted, setIsMuted] = useState<boolean>();

  const { permissionGranted } = usePermissions();

  function handleOnConnectionFailedRtmp() {
    console.log('Connection Failed');
  }

  function handleOnConnectionStartedRtmp() {
    console.log('Connection Started');
  }

  function handleOnConnectionSuccessRtmp() {
    console.log('Connected');
    setIsStreaming(true);
  }

  function handleOnDisconnectRtmp() {
    console.log('Disconnected');
    setIsStreaming(false);
  }

  function handleOnNewBitrateRtmp() {
    console.log('New Bitrate Received');
  }

  function handleUnmute() {
    publisherRef.current.unmute();
    setIsMuted(false);
  }

  function handleMute() {
    publisherRef.current.mute();
    setIsMuted(true);
  }

  function handleStartStream() {
    publisherRef.current.startStream();
  }

  function handleStopStream() {
    publisherRef.current.stopStream();
  }

  function handleSwitchCamera() {
    publisherRef.current.switchCamera();
  }

  return (
    <View style={styles.container}>
      {permissionGranted && (
        <RTMPPublisher
          ref={publisherRef}
          publishUrl={PUBLISH_URL}
          style={styles.publisher_camera}
          onConnectionFailedRtmp={handleOnConnectionFailedRtmp}
          onConnectionStartedRtmp={handleOnConnectionStartedRtmp}
          onConnectionSuccessRtmp={handleOnConnectionSuccessRtmp}
          onDisconnectRtmp={handleOnDisconnectRtmp}
          onNewBitrateRtmp={handleOnNewBitrateRtmp}
        />
      )}
      <View style={styles.footer_container}>
        {isMuted ? (
          <Button title="Unmute" onPress={handleUnmute} />
        ) : (
          <Button title="Mute" onPress={handleMute} />
        )}
        {isStreaming ? (
          <Button title="Stop Stream" onPress={handleStopStream} />
        ) : (
          <Button title="Start Stream" onPress={handleStartStream} />
        )}
        <Button title="Switch Camera" onPress={handleSwitchCamera} />
      </View>
      {isStreaming && <LiveBadge />}
    </View>
  );
}
