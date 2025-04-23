import {useState} from "react";

interface ResultComponentProps {
    msg:string,
    closeFn: () => void
}

export default function ResultComponent({msg, closeFn } :ResultComponentProps ) {

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
            <div className="bg-white rounded-2xl p-6 shadow-xl w-72 text-center space-y-4">

                <div className="flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>

                <p className="text-lg font-semibold">{getMsg()}</p>
            </div>
        </div>

    );
}