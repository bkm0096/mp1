import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

interface ResultComponentProps {
    msg: string,
    closeFn: () => void
}

export default function ResultComponent({ msg, closeFn }: ResultComponentProps) {

    const [showFlag, setShowFlag] = useState(msg && true)

    function getMsg() {
        if (msg === "D") return "삭제 완료";
        if (msg === "M") return "수정 완료";
        if (msg === "R") return "등록 완료";
        return msg;
    }

    if (!showFlag) return null;

    return (

        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            style={{ backgroundColor: 'rgba(169, 169, 169, 0.7)' }}
            onClick={() => {
                setShowFlag(false);
                closeFn();
            }}
        >
            <div className="bg-white rounded-2xl p-8 shadow-2xl w-80 text-center space-y-6 mx-auto my-16">
                <div className="flex items-center justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center shadow-md">
                        <FaCheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                </div>

                <p className="text-lg font-semibold">{getMsg()}</p>
            </div>
        </div>

    );
}