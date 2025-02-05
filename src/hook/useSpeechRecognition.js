import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

const useSpeechRecognition = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        // Initialize speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setTranscript(transcript);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
                toast.error('Voice input error. Please try again.');
            };

            setRecognition(recognition);
        }
    }, []);

    const startListening = useCallback(() => {
        if (recognition) {
            try {
                recognition.start();
                setIsListening(true);
                setTranscript('');
            } catch (error) {
                console.error('Speech recognition error:', error);
                toast.error('Voice input error. Please try again.');
            }
        } else {
            toast.error('Speech recognition is not supported in your browser');
        }
    }, [recognition]);

    const stopListening = useCallback(() => {
        if (recognition && isListening) {
            recognition.stop();
            setIsListening(false);
        }
    }, [recognition, isListening]);

    return {
        isListening,
        transcript,
        startListening,
        stopListening,
        isSupported: !!recognition
    };
};

export default useSpeechRecognition;