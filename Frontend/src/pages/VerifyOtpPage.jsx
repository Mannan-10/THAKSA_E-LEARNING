import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function VerifyOtpPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const [otp, setOtp] = useState("");

    const handleVerify = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/api/users/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    otp
                })
            });

            const data = await res.json();
            console.log("OTP VERIFICATION RESPONSE:", data);

            if (res.ok) {
                alert("OTP verified successfully!");
                navigate("/login");
            } else {
                alert(data.message || "Invalid OTP");
            }

        } catch (error) {
            console.error(error);
            alert("An error occurred during OTP verification.");
        }
    };

    if (!email) {
        return <h3>Email not found. Please register again.</h3>
    }

    return (
        <div style={{}}>
            <h2>Verify OTP</h2>
            <p>OTP sent to {email}</p>
            <form onSubmit={handleVerify}>
                <input 
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                <br /><br />
                <button type="submit">Verify</button>
            </form>
        </div>
    )
}