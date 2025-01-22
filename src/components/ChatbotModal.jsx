import { useState } from "react";

export default function ChatbotModal({ show, handleClose }) {
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendMessage = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const API_URL = "https://api.openai.com/v1/chat/completions";
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

        const messagesToSend = [
            ...allMessages,
            {
                role: 'user',
                content: message
            }
        ];

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: messagesToSend
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();

            if (data) {
                console.log(data);
                let newAllMessages = [
                    ...messagesToSend,
                    data.choices[0].message
                ];
                setAllMessages(newAllMessages);
                setMessage('');
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center dark:bg-black  bg-white bg-opacity-75 transition-opacity">
            <div className="relative  rounded-lg shadow-xl sm:max-w-lg w-full p-6">
                <div className="flex justify-between items-center pb-3">
                    <h3 className="text-xl font-medium text-">AI Assistant</h3>
                    <button type="button" className="text-gray-400 hover:text-gray-500" onClick={handleClose}>
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div>
                    {allMessages.map((msg, index) => (
                        <p key={index}><strong>{msg.role}:</strong> {msg.content}</p>
                    ))}
                </div>
                <form onSubmit={sendMessage} className="mt-4">
                    <input
                        type="text"
                        placeholder="Ask chatbot something..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className=" text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button type="submit" className="mt-3 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" disabled={loading}>
                        {loading ? "Sending..." : "Send"}
                    </button>
                </form>
                {error && <p className="mt-4 text-red-500">{error}</p>}
            </div>
        </div>
    )
}
