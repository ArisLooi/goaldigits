import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";

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
                // console.log(data);
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background bg-opacity-95 transition-opacity ">
            <div className="relative sm:max-w-lg w-full p-6 h-auto">
                <div className="flex justify-between items-center pb-3">
                    {/* Close Chat Modal */}
                    <button type="button" className="text-gray-400 hover:text-gray-500 mr-2" onClick={handleClose}>
                        <FaAngleLeft />
                    </button>

                    <h3 className="text-xl font-medium text-">AI Assistant</h3>
                    <div className="flex items-center space-x-3">
                        {/* Clear Messages Button */}
                        <button type="button" className="text-gray-400 hover:text-gray-500" onClick={() => setAllMessages([])}>
                            <span className="text-lg">Clear</span>
                        </button>
                    </div>
                </div>
                {allMessages.length > 0 && (
                    <div className="overflow-y-scroll border p-4 rounded-md 
    max-h-40 sm:max-h-50 md:max-h-80 lg:max-h-96">
                        {allMessages.map((msg, index) => (
                            <div key={index} className="mb-4">
                                <p className="font-semibold">{msg.role}:</p>
                                <p>{msg.content}</p>
                            </div>
                        ))}
                    </div>
                )}
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
